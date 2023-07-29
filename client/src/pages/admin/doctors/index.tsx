import Layout from "../../../Components/partials/Layout";
import Heading from "../../../Components/partials/Heading";
import WorkingDays from "../../../Components/admin/AdminUsers/Doctors/WorkingDays";
const DoctorWorking = () => {

  return (
    <Layout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Heading heading="Working Hours" />
      </div>
    <WorkingDays />
    </Layout>
  );
};
    
export default DoctorWorking;
