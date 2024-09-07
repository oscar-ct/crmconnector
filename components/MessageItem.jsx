import { PiPhoneFill } from "react-icons/pi";
import {formatDate} from "@/utils/formatDate";
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";

const MessageItem = ({data}) => {
    return (
        <tr>
            <td>
                <div className="w-52 flex items-center gap-3">
                    {
                        !data?.profilePhoto ? (
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content mask mask-squircle h-12 w-12">
                                    {
                                        data.fullName === null || data.fullName === "" ? (
                                            <PiPhoneFill size={25} fill={"limegreen"}/>
                                        ) : (
                                            <span>{data?.fullName?.substring(0, 1)}</span>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img
                                        src={data?.profilePhoto}
                                        alt="user" />
                                </div>
                            </div>

                        )
                    }
                    <div>
                        <div className="font-bold">{data?.fullName ? data.fullName : formatPhoneNumber(data.phone.substring(2, data.phone.length))}</div>
                        <div className="text-sm opacity-50">{formatDate(data?.dateUpdated)}</div>
                    </div>
                </div>
            </td>
            <td className={"max-w-xl truncate"}>
                <span>{data?.lastMessageBody?.substring(0, 132)}</span>
                <br/>
                <div className={"flex gap-4"}>
                    {data?.phone && <span className="badge badge-ghost badge-sm">{formatPhoneNumber(data.phone.substring(2, data.phone.length))}</span>}
                    {data?.email && <span className="badge badge-ghost badge-sm">{data.email}</span>}
                </div>
            </td>
            <th className={"w-32"}>
                {
                    data?.tags?.includes("sf") ? (
                        <span className={"w-32 flex flex-col justify-center items-center text-center text-xs"}>Connected To Service Fusion</span>
                    ) : (
                        <button className="w-32 btn btn-neutral text-xs btn-md rounded-full">
                            {/*<span className="loading loading-spinner"></span>*/}
                            Add To Service Fusion
                        </button>
                    )
                }
            </th>
        </tr>
    );
};

export default MessageItem;