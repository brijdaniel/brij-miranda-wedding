import Link from 'next/link';
import React from 'react';

export default function Page() {
    return (
        <div>
            <div className="absolute left-0 top-0 z-50">
                <Link href="/"><a className="btn bg-red-500 opacity-30 m-3">Home</a></Link>
            </div>
            <div style={{
                position: "relative",
                height: "0",
                paddingTop: "140.9524%",
                paddingBottom: "48px",
                boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
                marginTop: "1.6em",
                marginBottom: "0.9em",
                overflow: "hidden",
                borderRadius: "8px",
                willChange: "transform"
            }}>
                <iframe loading="lazy" style={{
                    "position": "absolute",
                    "width": "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    border: "none",
                    padding: 0,
                    margin: 0,
                }} src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAEpHiasgjg&#x2F;view?embed">
                </iframe>
            </div>
        </div>
    );
}
