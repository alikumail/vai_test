import Layout from "../../../Components/partials/Layout";
import Heading from "../../../Components/partials/Heading";
import GetUser from "../../../Components/admin/AdminUsers/GetUser";

const ViewUser = () => {
    return (
        <>
       <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Admin Users" />
        <div className="dashboard-btn-area">
          <a href="/dashboard/users/create" className="btn btn-primary">Add New User</a>
        </div>
      </div>
      <GetUser />

    </Layout>
        </>
      );
    };
    
    export default ViewUser;
    