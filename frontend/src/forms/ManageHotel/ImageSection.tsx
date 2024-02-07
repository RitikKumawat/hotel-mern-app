import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = ()=>{

    const {register, formState:{errors}} = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded flex flex-col p-4 gap-4">
                <input
                    type="file" multiple accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles",{
                        validate:(imageFiles)=>{
                            const totalLength = imageFiles.length;
                            
                            if(totalLength === 0){
                                return "At least one image should be added";
                            }
                            if(totalLength>6){
                                return "Total number of files can't exceed 6"
                            }
                            return true;
                        }
                    })}
                />
            </div>
            {
                errors.imageFiles && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.imageFiles.message}
                    </span>
                )
            }
        </div>
    )
};
export default ImageSection;