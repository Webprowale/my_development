import axios from 'axios'

export const uploadFilesApi  = async (formData:any)=>{
    const filesresponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return filesresponse.data
}