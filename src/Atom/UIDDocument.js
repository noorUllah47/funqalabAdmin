import { useState, useEffect } from "react"

const UIDDocument = (props) => {

    const [DownloadableFile, setDownloadableFile] = useState("");
    useEffect(() => {

        props.imagsFile(props.file, setDownloadableFile)
    }, [props?.uid])




    return (
        <>
            {DownloadableFile &&

                <div className="col-12 col-md-4 my-2 col-md-6 col-lg-4 p-2">
                    <div className="FileBox h-100 p-4">

                        <button className="infoformbtn" onClick={() => props.downloadFile(DownloadableFile, props.name)}>Download</button>
                        <p className="fw-400 fs14 t-grey-a mb-0">{props.name}</p>

                    </div>
                </div>
            }
        </>
    );
}

export default UIDDocument;