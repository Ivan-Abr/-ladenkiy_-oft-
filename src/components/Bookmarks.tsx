import React, {useState} from "react";
import {OrgComponent} from "./Organization/OrgComponent";
import {LayerComponent} from "./Layer/LayerComponent";
import {FactorComponent} from "./Factor/FactorComponent";
import {MilesComponent} from "./Milestone/MilestoneComponent";
import {MarkComponent} from "./Mark/MarkComponent";
import {QuestionComponent} from "./Question/QuestionComponent";

interface Bookmark {
    title: string;
    content: JSX.Element;
}


const BookmarkMenu: React.FC<{bookmarks: Bookmark[]}> = ({bookmarks}) => {
    const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);


    return (
        <div className="bookmark-menu">
        <ul className="bookmark-list">
            {bookmarks.map((bookmark, index) => (
                    <li key={index} onClick={() => setSelectedBookmark(bookmark)}>
    {bookmark.title}
    </li>
))}
    </ul>
    <div className="bookmark-content">
        {selectedBookmark && (
            <div>
                <h2>{selectedBookmark.title}</h2>
            <p>{selectedBookmark.content}</p>
            </div>
        )}
    </div>
    </div>
);}

export function Bookmarks(){
    const bookmarks: Bookmark[] = [
        {
            title:"Organization",
            content: <OrgComponent/>
        },
        {
            title:"Layer",
            content:<LayerComponent/>
        },
        {
            title:"Factor",
            content:<FactorComponent/>
        },
        {
            title:"Milestone",
            content:<MilesComponent/>
        },
        {
            title:"Mark",
            content:<MarkComponent/>
        },
        {
            title:"Question",
            content:<QuestionComponent/>
        }


    ];
    return <BookmarkMenu bookmarks={bookmarks}/>
}