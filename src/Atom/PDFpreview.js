import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFpreview(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function blobToBase64(blob) {
        var blob_iframe = document.querySelector('#blob-src-test');

        blob_iframe.src = blob;
        PDF()
    }


    const PDF = () => {

        let blob = new Blob(props.file, { type: "text/plain" });
        // The full Blob Object can be seen 
        // in the Console of the Browser
        console.log('Blob - ', props.file);

        var reader = new FileReader();
        reader.readAsDataURL(props.file);
        reader.onloadend = function () {
            var base64String = reader.result;
            console.log('Base64 String - ', base64String);

            // Simply Print the Base64 Encoded String,
            // without additional data: Attributes.
            console.log('Base64 String without Tags- ',
                base64String.substr(base64String.indexOf(', ') + 1));
        }
    }


    return (
        <div>

            {/* {PDF()} */}

            <iframe id="blob-src-test" frameborder="0" width="300px" height="300px"></iframe>

            <a href={`{props.file}.pdf`} target="_blank" >qwertyuiop</a>
            <p onClick={() => console.log(blobToBase64(props.file))}>
                Page {pageNumber} of {numPages}
            </p>

            <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
}


export default PDFpreview