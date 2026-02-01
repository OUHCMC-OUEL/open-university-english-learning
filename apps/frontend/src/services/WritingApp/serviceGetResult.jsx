import Apis, { endpoints } from '../../configs/apis'

export const handleSubmitWriting = async (present) => {
    try{
        let user_input = {
            input: present
        }
        let res;
        res = await Apis.post(endpoints['check-grammar'], user_input)
        return res.data
    }  
    catch(ex){
        console.log(ex)
        throw ex
    }
};