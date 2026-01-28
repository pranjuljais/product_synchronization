import UpdateBank from "../components/UpdateBank";
import UpdateBusiness from "../components/UpdateBusiness";
import UpdateTnc from "../components/UpdateTnc";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      <UpdateBusiness />
      <UpdateBank />
      <UpdateTnc />
    </div>
  );
};

export default Profile;
