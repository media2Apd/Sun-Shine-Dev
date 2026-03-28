import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getDashboardOverview = async (req, res) => {

  try {

    // total orders
    const totalOrders = await Order.countDocuments({
      isDeleted: false,
    });

    // total revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    // active customers
    const activeCustomers =
      await User.countDocuments({
        role: "CUSTOMER",
      });

    // products available
    const productsAvailable =
      await Product.countDocuments({
        isDeleted: false,
      });

    // lifecycle counts
    const newOrders = await Order.countDocuments({
      status: "Placed",
    });

    const PackagedOrders =
      await Order.countDocuments({
        status: "Packaged",
      });

    const dispatchedOrders =
      await Order.countDocuments({
        status: "Shipped",
      });

    const deliveredOrders =
      await Order.countDocuments({
        status: "Delivered",
      });

    // inventory snapshot
    const inventory = await Product.find(
      {},
      "name variants"
    ).limit(6);

    // recent orders
    const recentOrders = await Order.find()
      .populate("customerId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // customer insights
    const totalCustomers =
      await User.countDocuments({
        role: "CUSTOMER",
      });

    const newCustomers =
      await User.countDocuments({
        role: "CUSTOMER",
        createdAt: {
          $gte: new Date(
            new Date().setDate(
              new Date().getDate() - 7
            )
          ),
        },
      });

    return res.json({
      success: true,

      data: {
        totalOrders,
        totalRevenue,
        activeCustomers,
        productsAvailable,

        lifecycle: {
          newOrders,
          PackagedOrders,
          dispatchedOrders,
          deliveredOrders,
        },

        inventory,

        recentOrders,

        customerInsights: {
          totalCustomers,
          newCustomers,
        },
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};