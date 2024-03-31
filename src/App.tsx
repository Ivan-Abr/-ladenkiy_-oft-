import React, {useState} from 'react';
import './App.css';
import {OrgComponent} from "./components/Organization/OrgComponent";
import {LayerComponent} from "./components/Layer/LayerComponent";
import {FactorComponent} from "./components/Factor/FactorComponent";
import {MilesComponent} from "./components/Milestone/MilestoneComponent";



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
  );


};

function App (){
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
      }

  ];
  return <BookmarkMenu bookmarks={bookmarks}/>
};




export default App;
