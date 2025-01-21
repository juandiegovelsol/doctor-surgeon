const DashboardContent = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white shadow rounded p-4">
        {/* Chart 1 */}
        <p>Chart 1</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        {/* Table 1 */}
        <p>Table 1</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        {/* Chart 2 */}
        <p>Chart 2</p>
      </div>
      <div className="bg-white shadow rounded p-4 md:col-span-2">
        {/* Larger Widget */}
        <p>Larger Widget</p>
      </div>
    </div>
  );
};

export default DashboardContent;
