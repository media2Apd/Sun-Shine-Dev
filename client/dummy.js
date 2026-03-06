<div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border-separate border-spacing-y-2 px-2">
          <thead className="text-sm text-gray-600">
            <tr className="text-center rounded-lg shadow-sm bg-purple-100">
              <th className="py-4 px-4 rounded-l-lg">S.No</th>
              <th className="py-4 px-4">Order ID</th>
              <th className="py-4 px-4 whitespace-nowrap">Invoice ID</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Branch</th>
              <th className="py-4 px-4 whitespace-nowrap">Delivered Date</th>
              <th className="py-4 px-4 whitespace-nowrap">Assigned Staff</th>
              <th className="py-4 px-4 whitespace-nowrap">Delivery Address</th>
              <th className="py-4 px-4 whitespace-nowrap">Payment</th>
              <th className="py-4 px-4 whitespace-nowrap rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order, index) => (
              <tr
                key={order.orderId}
                className="bg-gray-50 hover:bg-gray-100 text-sm rounded-lg shadow-sm text-center"
              >
                <td className="py-3 px-4 font-medium text-gray-700 rounded-l-lg">
                  {itemsPerPage !== "All"
                    ? currentPage * itemsPerPage -
                    itemsPerPage +
                    serialNumber++
                    : serialNumber++}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700 capitalize">
                  {order.orderId}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">
                  {order.invoiceId || "-"}
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium whitespace-nowrap">{order.customer.name}</div>
                    <div className="text-xs text-gray-500">{order.customer.phoneNumber}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className='whitespace-nowrap'>{order.branch?.branchCode}</div>
                    <div className="text-xs text-gray-500">
                      {order.branch.branchName.replace(/\s*Branch\s*$/i, "")}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {format(new Date(order?.date), "dd-MM-yyyy") || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {order?.cuttingMaster?.name || order?.tailor?.name ? (
                    <div className="relative">
                      {/* Collapsed view */}
                      {expandedOrderId !== order._id && (
                        <div
                          className="cursor-pointer flex items-center"
                          onClick={() => setExpandedOrderId(order._id)}
                        >
                          <span>
                            {order?.cuttingMaster?.name?.split(' ')[0] ||
                              order?.tailor?.name?.split(' ')[0]}
                          </span>

                          {/* Show +1 if both names exist and are different */}
                          {(order?.cuttingMaster?.name &&
                            order?.tailor?.name &&
                            order.cuttingMaster.name !== order.tailor.name) && (
                              <span className="text-xs bg-gray-100 rounded px-1 ml-1">+1</span>
                            )}
                        </div>
                      )}

                      {/* Expanded view */}
                      {expandedOrderId === order._id && (
                        <div
                          className="cursor-pointer space-y-1"
                          onClick={() => setExpandedOrderId(null)}
                        >
                          {order?.cuttingMaster?.name && (
                            <div className="text-sm">{order.cuttingMaster.name} (cutting)</div>
                          )}

                          {order?.tailor?.name && (
                            <div className="text-sm">{order.tailor.name} (tailor)</div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 items-center text-lg"><Minus /></div>
                  )}
                </td>
                <td className="py-3 px-4">{order.customer.address}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <StatusBadge status={order.paymentStatus} type='payment' />
                </td>
                <td className="py-3 px-4 whitespace-nowrap rounded-r-lg">
                  <StatusBadge status={order.status} type='order' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>