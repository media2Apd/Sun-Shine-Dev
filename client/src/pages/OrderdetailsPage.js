

import { useOrder } from "../Context/OrderContext";

export default function OrderDetails() {

  const { orderData } = useOrder();

  // ✅ same logic as success page (latest order)
  const order = Array.isArray(orderData)
    ? orderData[orderData.length - 1]
    : orderData;

  if (!order) {
    return <div className="p-6 text-red-500">Order not found</div>;
  }

  const items = order.items || [];

  const billing = order.billingAddress || {};
  const shipping = order.shippingAddress || {};

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const total = order.total || subtotal;

  const steps = [
    "Order received",
    "Processing",
    "On the way",
    "Delivered",
  ];
const currentStep = steps.indexOf(order.status || "Order received");
  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toDateString()} • {items.length} Products
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <AddressCard title="Billing Address" data={billing} />
          <AddressCard title="Shipping Address" data={shipping} />

          {/* Summary */}
          <div className="border rounded-lg p-4 text-sm">
            <Row label="Order ID" value={order.orderId} />
            <Row label="Payment" value={order.paymentMethod} />

            <hr className="my-3" />

            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Shipping" value="Free" />

            <div className="flex justify-between mt-3 font-semibold text-green-600">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="overflow-x-auto mb-6">
  <div className="min-w-[500px] flex justify-between relative">

    {/* background line */}
    <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>

    {/* ✅ dynamic progress */}
    <div
      className="absolute top-4 left-0 h-1 bg-green-500"
      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
    ></div>

    {steps.map((label, index) => (
      <div key={index} className="flex flex-col items-center w-full z-10">

        {/* ✅ active step color */}
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border
          ${index <= currentStep
            ? "bg-green-600 text-white"
            : "text-gray-500"}
          `}
        >
          {(index + 1).toString().padStart(2, "0")}
        </div>

        <p className="text-xs mt-2 text-gray-500">{label}</p>

      </div>
    ))}

  </div>
</div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead className="border-b text-gray-400">
              <tr>
                <th className="py-2 text-left">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                    {item.name}
                  </td>
                  <td>₹{item.price}</td>
                  <td>x{item.qty}</td>
                  <td className="text-right">
                    ₹{item.price * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* 🔁 Address Component */

const AddressCard = ({ title, data }) => (
  <div className="border rounded-lg p-4 text-sm">
    <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>

    <p className="font-medium">
      {data?.firstName} {data?.lastName}
    </p>

    <p className="text-gray-500 text-xs">
      {data?.street}, {data?.state}, {data?.country}
    </p>

    <div className="mt-3">
      <p className="text-gray-400 text-xs">Email</p>
      <p>{data?.email}</p>
    </div>

    <div className="mt-2">
      <p className="text-gray-400 text-xs">Phone</p>
      <p>{data?.phone}</p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between mb-1">
    <span className="text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

