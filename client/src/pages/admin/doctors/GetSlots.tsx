import Layout from "../../../Components/partials/Layout";
import Heading from "../../../Components/partials/Heading";
import AvailableSlots from "../../../Components/admin/AdminUsers/Doctors/AvailableSlots";
const GetSlots = () => {
 
  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Book Appoinments" />
      </div>
    <AvailableSlots />
    </Layout>
  );
};
    
export default GetSlots;
