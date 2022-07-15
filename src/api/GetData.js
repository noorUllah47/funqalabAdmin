import axios from "axios";

class GetData {
  constructor() {
    this.result = [];
  }

  FormSubmitted = (pgNum, size) => {
    const res = async () => {
      const resp = await axios
        .get('admin/data')
        // .get(`account-details/?pageNo=${pgNum}&pageSize=${size}&order=DESC`)


        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      console.log("paginated data", resp);
      return resp;
    };
    return res();
  }
  getCorrectionData = () => {
    const res = async () => {
      const resp = await axios
        .get('corrections')
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      console.log(" data =>>>", resp);
      return resp;
    };
    return res();
  }

  FormSearchSubmitted = (pgNum, size, searchParams) => {


    const res = async () => {
      const resp = await axios
        .get(`account-details/?pageNo=${pgNum}&pageSize=${size}&search=${searchParams}`)
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      console.log("paginated data", resp);
      return resp;
    };
    return res();
  }

  GetAllAuctions = () => {
    const res = async () => {
      const resp = await axios
        .get(`auction/admin/get`)
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      console.log("paginated ------------------data", resp);
      return resp;
    };
    return res();
  }

  FormSubmitted2 = () => {
    const res = async () => {
      const resp = await axios
        .get(`account-details/without-pagination`)
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      console.log("paginated ------------------data", resp);
      return resp;
    };
    return res();
  }
  SingleDetail = (id) => {
    const res = async () => {
      const resp = await axios
        .get(`account-details/${id}`)
        .catch(function (error) {
          console.log(error);
        });
      this.result = resp;
      console.log(resp);
      return resp;
    };
    return res();
  }

  SingleFile = (name) => {
    console.log({ name })
    // alert('1')
    const res = async () => {

      const axiosInstanceRemote = axios.create({
        baseUrl: "103.31.81.9:8080/api/v1/"
      })
      // const resp = await axios
      //   .get(`save-file/${name}`)
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      const resp = await axiosInstanceRemote
        .get(`https://aof-multinet-staging.nextventures.com.pk/api/v1/save-file/${name?.replace('.', '/')}`)
        .catch(function (error) {
          console.log(error);
        });
      this.result = resp;
      console.log('response i125', name, resp);
      return resp;
    };
    return res();
  }


  GetKycDocument = (id) => {



    const res = async () => {


      const resp = await axios
        .post('account-details/kyc', {

          uid: id


        }, { responseType: 'blob' })
        .catch(function (error) {
          console.log(error);
        });
      this.result = resp;

      return resp;
    };
    return res();
  }

  Return() {
    return this.result;
  }
}
export default new GetData();
