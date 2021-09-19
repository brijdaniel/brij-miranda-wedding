export function TickAnimated(props: {width: number}) {
    return <svg className="svg-check" xmlns="http://www.w3.org/2000/svg" viewBox="16 0 60 65" width={props.width} height="auto">
        <clipPath id="check-outline">
            <rect id="rect10" width="12.851191" height="26.458332" x="-19.468746" y="38.110569" style={{ strokeWidth: '0.26458332' }} transform="rotate(-47.828289)" ry={3} />
            <rect style={{ strokeWidth: '0.38341767' }} y="-37.454758" x="52.11253" height="55.5625" width="12.851191" id="rect12" transform="rotate(43.375683)" ry={3} />
        </clipPath>
        <g clipPath="url(#check-outline)">
            <path className="animated-checkmark animated-checkmark-one" style={{ fill: 'none', stroke: '#00be00', strokeWidth: '13.16499996' }} d="M 19.332423,35.101011 39.130642,53.241916" id="path14" />
            <path className="animated-checkmark animated-checkmark-two" style={{ fill: 'none', stroke: '#00be00', strokeWidth: '13.16499996' }} id="path821" d="M 38.107767,44.992557 68.358274,12.734297" />
        </g>
    </svg>
}