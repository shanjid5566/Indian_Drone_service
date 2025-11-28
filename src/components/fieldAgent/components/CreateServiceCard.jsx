import { MdUploadFile } from "react-icons/md";
const CreateServiceCard = ({ onCreateService }) => {
  return (
    <div className="bg-white p-2 sm:p-4 rounded-2xl w-full mx-auto border border-gray-100">
      <button
        onClick={onCreateService}
        className="text-[#28A844]  px-5 py-2 rounded mx-auto flex flex-col items-center gap-2 text-sm md:text-base"
      >
        <MdUploadFile  className=" size-20 md:size-24 mx-auto"/> <p>Create Service</p>
      </button>
    </div>
  );
};

export default CreateServiceCard;
