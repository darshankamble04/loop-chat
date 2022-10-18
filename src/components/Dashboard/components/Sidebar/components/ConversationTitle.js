import React, { useContext, useState } from "react";
import DataContext from "../../../../../context/DataContext";
import "../css/conversationTitle.css";
import { dateChecks, IsInContact } from "../../../../../Helper";
import db from "../../../../../Firebase";

export default function ConversationTitle({
    id,
    title,
    isCHATSTab,
    setDisplay,
    lastActivity,
    lastSeenTime,
    isConversation,
}) {
    const { allContacts, getChatInfo, MY_USERID, allChats, setDNone } =
        useContext(DataContext);
    const { flag, setFlag } = useState(0);
    return (
        <div
            onClick={() => {
                if (isConversation) {
                    getChatInfo(id);
                    setDNone(true);
                } else {
                    // eslint-disable-next-line
                    allChats.map((chat) => {
                        if (chat)
                            if (chat.sender === lastActivity) {
                                getChatInfo(chat.id);
                                setDNone(true);
                                setFlag(1);
                            }
                    });
                    if (!flag) {
                        db.collection("Conversations").add({
                            tab: "chat",
                            messages: [],
                            members: [lastActivity, MY_USERID],
                        });
                        setDisplay(0);
                    }
                }
            }}
            className="conversationTitle d-vcenter jc-between "
        >
            <div className="d-flex">
                <div className="ctLeft">
                    <img
                        src="https://avatar-loop-chat.s3.us-west-2.amazonaws.com/defaultAvatar.png"
                        alt=""
                    />
                </div>
                <div className="ctMid mx-2 w-100">
                    <div className="ctTitle">
                        {isCHATSTab
                            ? title === IsInContact(title, allContacts)
                                ? `@${title}`
                                : `${IsInContact(title, allContacts)}`
                            : title === IsInContact(title, allContacts)
                                ? `${title}`
                                : `${IsInContact(title, allContacts)}`
                        }
                    </div>
                    <div className="ctLastActivity small">
                        {
                            isConversation&&isConversation ?
                            lastActivity?.length>35?lastActivity?.slice(0,30)+"...":lastActivity
                            :
                            `@${lastActivity}`
                        }
                    </div>
                </div>
            </div>
            <div className="ctRight small">
                <div className="ctLastSeenTime small text-gray">
                    {
                        lastSeenTime !== "Invalid Date" &&
                        dateChecks(lastSeenTime)
                    }
                </div>
                <div className="ctNotification d-none d-center small">1</div>
            </div>
        </div>
    );
}
