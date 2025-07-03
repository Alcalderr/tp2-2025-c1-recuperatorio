import { getDbSupplies } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllSales(page, pageSize) {
    const db = getDbSupplies();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const sales = await db.collection("sales")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return sales;
    } else {
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find().toArray();
        return sales;
    }
};

export async function findSaleById(saleId) {
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({ _id: new ObjectId(saleId) });
    return sale;
};

export async function findSalesWithTotal(page, pageSize) {
    const sales = await findAllSales(page, pageSize);

    for (const sale of sales) {
        const items = sale["items"];
        for (const item of items) {
            item["totalAmount"] = parseFloat(item.price) * item["quantity"];
        }
    }
    return sales;
};

export async function findSalesByCustomerEmail(email) {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({ "customer.email": email }).toArray();
    return sales;
};

export async function updateCouponUsed(saleId, couponUsed) {
    const db = getDbSupplies();

    if (!ObjectId.isValid(saleId)) {
        throw new Error("ID invalido");
    }

    const result = await db.collection("sales").updateOne(
        { _id: new ObjectId(saleId) },
        { $set: { couponUsed: couponUsed } }
    );

    return result.modifiedCount > 0;
};

export async function getTopSellingProducts(limit) {
    const db = getDbSupplies();

    const pipeline = [
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.name",
                quantity: { $sum: "$items.quantity" }
            }
        },
        { $sort: { quantity: -1 } },
        { $limit: limit },
        {
            $project: {
                _id: 0,
                name: "$_id",
                quantity: 1
            }
        }
    ]
    return await db.collection("sales").aggregate(pipeline).toArray();
};