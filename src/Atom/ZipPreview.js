import { useEffect, useState } from "react";





const ZipPreview = (props) => {

    const [DownloadableFile, setDownloadableFile] = useState("");
    console.log(props)
    let other_files = props.data.other?.other || ''
    let files = [props.data.cnicfront, props.data.cnicback, props.data.IncomeProof,
    props.data.MailingAddProof, props.data.kinCNIC_front, props.data.kinCNIC_back, props.data.JointCNIC_front, props.data.JointCNIC_back,
    props.data.JointIncomeProof, props.data.JointMailingAddProof, `${props.data?.uid}.pdf`,
    props.data?.tradingAgreement == 1 ? `trading-${props.data?.uid}.pdf` : '',
    props.data?.tripartiteAgreement == 1 ? `tripartitet-${props.data?.uid}.pdf` : '',
    props.data?.giftAgreement == 1 ? `gift-${props.data?.uid}.pdf` : '',
    props.data?.retirementAgreement == 1 ? `retirement-${props.data?.uid}.pdf` : '',
    ...other_files]
    var filtered = files.filter(each => each !== '' && each !== null);
    useEffect(() => {
        props.imagsFile(props.uid, filtered, setDownloadableFile)
    }, [props.data])



    return (
        <>

            {DownloadableFile &&
                // <div className="col-12 col-md-4 my-2 col-md-6 col-lg-4 p-2">
                //     <div className="FileBox h-100 p-4">
                <>
                    <button className="infoformbtn ms-auto" onClick={() => props.downloadFile(DownloadableFile, props.name, 'zip')}>Download All</button>
                    {/* <p className="fw-400 fs14 t-grey-a mb-0">{props.name}</p> */}
                </>

                //     </div>
                // </div>
            }
        </>
    );
}

export default ZipPreview;