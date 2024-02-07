import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotel/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-clients";
const AddHotel = ()=>{
    const {showToast} = useAppContext();
    const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
        onSuccess:()=>{
            showToast({message:"Hotel Saved!",type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message:"Error Saving Hotel",type:"ERROR"})
        }
    })
    const handleSave = (HotelFormData:FormData)=>{
        mutate(HotelFormData)
        
    }
    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    )
}

export default AddHotel;