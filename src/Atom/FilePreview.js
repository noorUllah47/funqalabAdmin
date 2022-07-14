import { useEffect, useState } from "react";
// import PDFpreview from "./PDFpreview";
// import PDFpreview from "./PDFpreview";





const FilePreview = (props) => {

    const [DownloadableFile, setDownloadableFile] = useState("");
    useEffect(() => {
        props.imagsFile(props.file, setDownloadableFile)
    }, [props.file])



    return (
        <>

            {DownloadableFile &&
                <div className="col-12 col-md-4 my-2 col-md-6 col-lg-4 p-2">
                    <div className="FileBox h-100 p-4">

                        {props.file.includes('.pdf') ? <> <button className="infoformbtn" onClick={() => props.downloadFile(DownloadableFile, props.name, 'pdf')}>Download</button>
                            {/* <PDFpreview file={DownloadableFile} /> */}
                            {/* {console.log({ DownloadableFile })} */}
                            {/* <iframe
                                width="200"
                                height="150"
                                title={DownloadableFile}
                                src={DownloadableFile}
                            /> */}
                            {/* <PDFpreview file={DownloadableFile} name={props.name} /> */}
                        </> : <a href={DownloadableFile} target="_blank " download>
                            <img src={DownloadableFile} alt='' />
                        </a>
                        }
                        <p className="fw-400 fs14 t-grey-a mb-0">{props.name}</p>

                    </div>
                </div>
            }
        </>
    );
}

export default FilePreview;