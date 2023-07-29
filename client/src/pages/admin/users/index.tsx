import Layout from "../../../Components/partials/Layout";
import Heading from "../../../Components/partials/Heading";
import AdminUsers from "../../../Components/admin/AdminUsers";

const Users = () => {

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Admin Users" />
        <div className="dashboard-btn-area">
          <a href="/dashboard/users/create" className="btn btn-primary">Add New User</a>
        </div>
      </div>
      <AdminUsers />

    </Layout>
  );
};
    
export default Users;
