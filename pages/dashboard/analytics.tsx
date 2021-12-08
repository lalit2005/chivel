import DashboardLayout from "@/layouts/DashboardLayout";

const Analytics = () => {
  return (
    <DashboardLayout
      page="analytics"
      heading="Analytics"
      description="Find out how your website is performing in the wild!">
      <div>
        <div className="px-5 py-4 border border-gray-700 rounded">
          <h3 className="text-3xl font-extrabold">3k</h3>
          <h3 className="mt-2 text-lg font-medium uppercase">Page views</h3>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
