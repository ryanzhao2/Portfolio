'use client';

import {BiSolidDownload} from "react-icons/bi";
import {useCallback} from "react";
import {saveAs} from "file-saver";

export default function DownloadButton() {
    const handleDownload = useCallback(() => {
        const downloadUrl = "/resume?download=true";
        saveAs(downloadUrl);
    }, []);

    return (
        <a
            className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
            title="Download Resume"
            onClick={handleDownload}
        >
            <BiSolidDownload className="text-lg" aria-label="Download Resume"/>
        </a>
    );
}