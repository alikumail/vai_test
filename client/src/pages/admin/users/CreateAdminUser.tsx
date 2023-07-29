import Layout from "../../../Components/partials/Layout";
import Heading from "../../../Components/partials/Heading";
import CreateUser from "../../../Components/admin/AdminUsers/CreateUser";
const CreateAdminUser = () => {
    return (
        <>
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Admin Users" />
      </div>
      <CreateUser />

    </Layout>
        </>
      );
    };
    
    export default CreateAdminUser;
    