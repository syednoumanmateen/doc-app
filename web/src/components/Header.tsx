import { createElement, FC, memo } from 'react'

interface propsType {
    title: string;
    tag: string;
    position?: string;
}

const Header: FC<propsType> = ({ title, tag, position = "center" }) => {
    const headertag = tag ? createElement(tag, { className: "mb-2" }, title) : null;
    const maintag = createElement("div", { className: position === "center" ? "d-flex justify-content-center mb-3" : "mb-3" }, headertag);

    return (
        <>
            {maintag}
        </>
    )
}

export default memo(Header)
