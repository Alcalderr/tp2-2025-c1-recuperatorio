import { findAllSales, findSaleById, findSalesByCustomerEmail, findSalesWithTotal, getTopSellingProducts, updateCouponUsed } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
};

export async function getSaleById(saleId) {
    return await findSaleById(saleId);
};

export async function getSalesWithTotal(page, pageSize) {
    return await findSalesWithTotal(page, pageSize);
};

export async function getSalesByCustomerEmail(email) {
    return await findSalesByCustomerEmail(email);
};

export async function changeCouponUsed(saleId, couponUsed) {
    return await updateCouponUsed(saleId, couponUsed);
};

export async function fetchTopProducts(limit) {
    const top = await getTopSellingProducts(limit);
    return top;
}