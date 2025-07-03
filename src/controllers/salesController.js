import { changeCouponUsed, fetchTopProducts, getSaleById, getSales, getSalesByCustomerEmail, getSalesWithTotal } from "../services/salesService.js";

export const getAllSales = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSales(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getSale(req, res) {
    try {
        const sale = await getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale);
    } catch (error) {
        console.error("Error fetching sales: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getSalesTotal(req, res) {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesWithTotal(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener las ventas con total: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getSalesByEmail(req, res) {
    try {
        const { email } = req.params;
        const sales = await getSalesByCustomerEmail(email);
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener ventas por email: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateCoupon(req, res) {
    const { id } = req.params;
    const { couponUsed } = req.body;

    if (typeof couponUsed !== "boolean") {
        return res.status(400).json({ message: "El campo couponUsed debe ser booleano"});
    }

    try {
        const updated = await changeCouponUsed(id, couponUsed);
        if (!updated) {
            return res.status(404).json({ message: "Venta no encontrada o sin cambios" });
        }
        res.json({ message: "Campo couponUsed actualizado correctamente"});
    } catch (error) {
        console.error("Error al actualizar couponUsed: ", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
};

export async function getTopProducts(req,res) {
    try {
        const limit = parseInt(req.query.limit) || 5;

        if (limit <= 0) {
            return res.status(400).json({ message: "El parametro limit debe ser mayor a 0"});
        }

        const topProducts = await fetchTopProducts(limit);
        res.json(topProducts);
    } catch (error) {
        console.error("Error al obtener productos mas vendidos: ", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}