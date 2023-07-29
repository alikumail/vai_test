import Layout from "../../Components/partials/Layout";
import AdminDashboard from "../../Components/admin/Dashboard";
import Heading from "../../Components/partials/Heading";
const Dashboard = () => {

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Dashboard" />
        <div className="dashboard-btn-area">
          <a href="/dashboard/users/create" className="btn btn-primary">Add New User</a>
        </div>
      </div>
    <AdminDashboard />
    </Layout>
  );
};
    
export default Dashboard;
