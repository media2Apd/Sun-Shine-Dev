
// import { useOrder } from "../Context/OrderContext";
// import { useState } from "react";
// import ConfirmModal from "../panelComponents/ConfirmModal";
// import { useLocation } from "react-router-dom";

// export default function AdminorderOverview({  }) {
//   const location = useLocation();
//   const id = location.state?.id;
//   const { orderData, setOrderData, updateOrderStatus } = useOrder(); // ✅ setOrderData bring பண்ணி
//   const [openStatus, setOpenStatus] = useState(false);
//   const [confirmBox, setConfirmBox] = useState({ open: false, status: "" });

//   // ✅ Select specific order if orderIdProp exists
//   const order = Array.isArray(orderData)
//     ? orderData.find(o => o.orderId === id) || orderData[orderData.length - 1]
//     : orderData;

//   if (!order) return <div className="p-1 text-red-500">Order not found</div>;

//   // ✅ Deep copy items to prevent last order override issue
//   const items = order.items ? order.items.map(item => ({ ...item })) : [];
//   const billing = order.billingAddress || {};
//   const shipping = order.shippingAddress || {};
//   const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const total = order.total || subtotal;

//   const steps = ["Order received", "Processing", "On the way", "Delivered"];
//   const currentStep = steps.indexOf(order.status || "Order received");

//   const handleConfirm = () => {
//     updateOrderStatus(order.orderId, confirmBox.status);
//     setConfirmBox({ open: false, status: "" });
//   };

//   // ✅ Safe function to update items for a specific order
//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData(prevOrders =>
//       prevOrders.map(o =>
//         o.orderId === orderId ? { ...o, items: newItems.map(item => ({ ...item })) } : o
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen p-3 sm:p-6">
//       {/* CONFIRM MODAL */}
//       <ConfirmModal
//         open={confirmBox.open}
//         title="Confirm Status Change"
//         message={`Are you sure you want to change status to "${confirmBox.status}"?`}
//         onConfirm={handleConfirm}
//         onCancel={() => setConfirmBox({ open: false, status: "" })}
//       />

//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-3">
//           <div>
//             <h2 className="text-lg font-semibold">Order Details</h2>
//             <p className="text-sm text-gray-500">
//               {new Date(order.createdAt).toDateString()} • {items.length} Products
//             </p>
//           </div>

//           {/* STATUS DROPDOWN */}
//           <div className="relative">
//             <button
//               onClick={() => setOpenStatus(!openStatus)}
//               className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
//             >
//               {order.status || "Order received"}
//             </button>

//             {openStatus && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md z-50">
//                 {steps.map((step, i) => {
//                   const isDisabled = i <= currentStep;
//                   return (
//                     <button
//                       key={i}
//                       disabled={isDisabled}
//                       onClick={() => {
//                         setConfirmBox({ open: true, status: step });
//                         setOpenStatus(false);
//                       }}
//                       className={`block w-full text-left px-3 py-2 text-sm
//                         ${isDisabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//                     >
//                       {step}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <AddressCard title="Billing Address" data={billing} />
//           <AddressCard title="Shipping Address" data={shipping} />
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.orderId} />
//             <Row label="Payment" value={order.paymentMethod} />
//             <hr className="my-3" />
//             <Row label="Subtotal" value={`₹${subtotal}`} />
//             <Row label="Shipping" value="Free" />
//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>
//           </div>
//         </div>

//         {/* STEPPER */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">
//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
//             <div
//               className="absolute top-4 left-0 h-1 bg-green-500"
//               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//             />
//             {steps.map((label, index) => (
//               <div key={index} className="flex flex-col items-center w-full z-10">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border 
//                   ${index <= currentStep ? "bg-green-600 text-white" : "text-gray-500"}`}>
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500">{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] text-sm">
//             <thead className="border-b text-gray-400">
//               <tr>
//                 <th className="py-2 text-left">Product</th>
//                 <th>Price</th>
//                 <th>Qty</th>
//                 <th className="text-right">Subtotal</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />
//                     {item.name}
//                   </td>
//                   <td>₹{item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">₹{item.price * item.qty}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */
// const AddressCard = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>
//     <p className="font-medium">{data?.firstName} {data?.lastName}</p>
//     <p className="text-gray-500 text-xs">{data?.street}, {data?.state}, {data?.country}</p>
//     <div className="mt-3">
//       <p className="text-gray-400 text-xs">Email</p>
//       <p>{data?.email}</p>
//     </div>
//     <div className="mt-2">
//       <p className="text-gray-400 text-xs">Phone</p>
//       <p>{data?.phone}</p>
//     </div>
//   </div>
// );

// const Row = ({ label, value }) => (
//   <div className="flex justify-between mb-1">
//     <span className="text-gray-500">{label}</span>
//     <span>{value}</span>
//   </div>
// );
import { useOrder } from "../Context/OrderContext";
import { useState, useMemo } from "react";
import ConfirmModal from "../panelComponents/ConfirmModal";
import { useLocation } from "react-router-dom";

export default function AdminorderOverview() {
  const location = useLocation();
  const passedOrder = location.state?.order;
  const id = location.state?.id;

  const { orderData, updateOrderStatus } = useOrder();

  const [openStatus, setOpenStatus] = useState(false);
  const [confirmBox, setConfirmBox] = useState({ open: false, status: "" });

  // safer order selection
  const order = useMemo(() => {
    if (passedOrder) return passedOrder;
    return orderData.find((o) => o.orderId === id);
  }, [passedOrder, orderData, id]);

  if (!order) return <div className="p-1 text-red-500">Order not found</div>;

  const items = order.items ? order.items.map((item) => ({ ...item })) : [];
  const billing = order.billingAddress || {};
  const shipping = order.shippingAddress || {};
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = order.total || subtotal;

  const steps = ["Order received", "Processing", "On the way", "Delivered"];
  const currentStep = steps.indexOf(order.status || "Order received");

  const handleConfirm = () => {
    updateOrderStatus(order.orderId, confirmBox.status);
    setConfirmBox({ open: false, status: "" });
  };

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <ConfirmModal
        open={confirmBox.open}
        title="Confirm Status Change"
        message={`Are you sure you want to change status to "${confirmBox.status}"?`}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmBox({ open: false, status: "" })}
      />

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold">Order Details</h2>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toDateString()} • {items.length} Products
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setOpenStatus(!openStatus)}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
            >
              {order.status || "Order received"}
            </button>

            {openStatus && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md z-50">
                {steps.map((step, i) => {
                  const isDisabled = i <= currentStep;
                  return (
                    <button
                      key={i}
                      disabled={isDisabled}
                      onClick={() => {
                        setConfirmBox({ open: true, status: step });
                        setOpenStatus(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm
                      ${isDisabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
                    >
                      {step}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <AddressCard title="Billing Address" data={billing} />
          <AddressCard title="Shipping Address" data={shipping} />

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

        <div className="overflow-x-auto mb-6">
          <div className="min-w-[500px] flex justify-between relative">
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
            <div
              className="absolute top-4 left-0 h-1 bg-green-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
            {steps.map((label, index) => (
              <div key={index} className="flex flex-col items-center w-full z-10">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border
                  ${index <= currentStep ? "bg-green-600 text-white" : "text-gray-500"}`}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <p className="text-xs mt-2 text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

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
                    <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />
                    {item.name}
                  </td>
                  <td>₹{item.price}</td>
                  <td>x{item.qty}</td>
                  <td className="text-right">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
