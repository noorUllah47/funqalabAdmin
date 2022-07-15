import axios from "axios";

class Account {
  constructor() {
    this.result = [];
  }

  Login = (email, password) => {
    const res = async () => {
      const resp = await axios
        .post('credentials/admin/login', {
          email: email,
          password: password
        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }

  CreateAuctionDates = (data) => {
    const res = async () => {
      const resp = await axios
        .post('auction/create', {

          instruments: data?.instrument,
          auctionDate: data?.AuctionDate,
          settlementDate: data?.settlementDate,
          cutoffDate: data?.cuttOfDate


        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }

  UpdateAuctionDates = (data) => {
    console.log('data is=========', data)
    const res = async () => {
      const resp = await axios
        .put('auction/update', {
          _id: data?._id,
          data: {
            instruments: data?.instrument,
            auctionDate: data?.AuctionDate,
            settlementDate: data?.settlementDate,
            cutoffDate: data?.cuttOfDate
          }

        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }

  DeleteAuctionDates = (data) => {
    console.log('delete record id  is ========', data?._id)
    var data1 = JSON.stringify({
      "_id": data?._id
    });
    console.log('delete record id  is ========', data1)
    const res = async () => {
      const resp = await axios
        .delete('auction/delete', {

          data: {
            _id: data?._id
          }

        })
        .catch(function (error) {
          console.log(error);
        });
      this.result = resp;
      console.log(resp);
      return resp;
    };
    return res();

  }


  GetImageDocuemnt = (img, func) => {
    console.log('imah ===?', img)
    const res = async () => {
      const resp = await axios
        .post('https://ips-multinet-staging.finqalab.com/v1/doc/get', {
          filename: img,
        },
          {
            validateStatus: (s) => s <= 500,
            responseType: 'blob',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          })
        .then(async (response) => {
          if (response.status !== 200) {
            // error handling
            const error = JSON.parse(await response.data.text());
            console.log('error: ', error);
            alert(error?.message);
          } else {
            console.log('agj', response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            func(url)
          }
        })
        .catch(function (error) {
          // alert(error.response.data.message);
          console.log('errrro', error);
          console.log('agj1', error.response.data.text())
        });
      this.result = resp;
      return resp;
    };
    return res();
  }


  GetZipDocuemnt = (uid, files, func) => {
    const res = async () => {
      const resp = await axios
        .post('https://ips-multinet-staging.finqalab.com/v1/doc/zip', {
          uid: uid,
          files: files,
        },
          {
            validateStatus: (s) => s <= 500,
            responseType: 'blob',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/zip'
            }
          })
        .then(async (response) => {
          if (response.status !== 200) {
            // error handling
            const error = JSON.parse(await response.data.text());
            console.log('error: ', error);
            alert(error?.message);
          } else {
            console.log('zip', response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'Allfile.zip'); //or any other extension
            // document.body.appendChild(link);
            // link.click();
            func(url)
          }
        })
        .catch(function (error) {
          // alert(error.response.data.message);
          console.log('errrro', error);
          console.log('agj1', error.response.data.text())
        });
      this.result = resp;
      return resp;
    };
    return res();
  }

  ChangeOfficialNclStatus = (uid, status, details) => {
    const res = async () => {
      const resp = await axios
        .put('credentials/status', {
          uid: uid,
          status: status,
          CorrectionDetails: details
        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }

  OfftoggleKycAndCrc = (data, userId) => {
    const res = async () => {
      const resp = await axios
        .post('account-details/', {

          status: false,

          COMP_STATUS: "false",

          uid: userId


        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }


  SubmitKycAndCrc = (data, userId) => {
    const res = async () => {
      const resp = await axios
        .post('account-details/', {

          status: false, // status true for submition and false for save and exist
          SUB_ACCOUNT: data?.subaccount,
          TRADING_ACCOUNT: data?.traidingaccount,
          COMP_STATUS: "true",
          COMP_STATE: "Finalized",
          uid: userId


        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }
  CreateCorrections = (data, paramuid, compstatus) => {
    const res = async () => {
      const resp = await axios
        .post('corrections', {

          uid: paramuid,
          status: compstatus ? compstatus : '',
          description: data?.desription,
          title: data?.title


        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }
  EditCorrections = (data, paramuid, compstatus) => {



    const res = async () => {
      const resp = await axios
        .put(`corrections/${data?.id}`, {

          uid: paramuid,
          status: compstatus ? compstatus : '',
          // status: compstatus ? compstatus : 'false',
          description: data?.message ? data?.message : data?.description,
          title: data?.title


        })
        .catch(function (error) {
          console.log(error.response);
        });
      this.result = resp;
      return resp;
    };
    return res();
  }



  DeleteCorrections = (data) => {

    const res = async () => {
      const resp = await axios
        .delete(`corrections/${data?.id}`)
        .catch(function (error) {
          console.log(error);
        });
      this.result = resp;
      console.log(resp);
      return resp;
    };
    return res();

  }


  Return() {
    return this.result;
  }
}
export default new Account();
