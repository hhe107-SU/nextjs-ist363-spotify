import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import classnames from "classnames/bind";

import ShowcaseContent from "./Content";
import ShowcaseExpandedContent from "./ExpandedContent";
import ShowcaseImages from "./Images";

import styles from "./Showcase.module.scss";

const cx = classnames.bind(styles);

const Showcase = ({ items }) => {
 const [activeIndex, setActiveIndex] = useState(0);
 const [albums, setAlbums] = useState([]);
 const [isExpanded, setIsExpanded] = useState(false);

 useEffect(() => {
  //console.log("use effect for showcase");
  if (items.length > 0) {
   try {
    fetch(`/api/albums?id=${items[activeIndex].id}`)
     .then((res) => res.json())
     .then((data) => {
      setAlbums(data.items);
     });
   } catch (error) {
    console.log(error);
   }
  }
 }, [activeIndex, items]);

 console.log({ albums });

 const showcaseClasses = cx({
  showcase: true,
  expanded: isExpanded,
 });

 return (
  <div className={showcaseClasses}>
   <AnimatePresence>
    <ShowcaseImages
     items={items}
     activeIndex={activeIndex}
     isExpanded={isExpanded}
    />
    {!isExpanded ? (
     <ShowcaseContent
      items={items}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      latestRelease={albums.length > 0 ? albums[0] : null}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
     />
    ) : (
     <ShowcaseExpandedContent
      items={items}
      activeIndex={activeIndex}
      albums={albums}
      setIsExpanded={setIsExpanded}
     />
    )}
   </AnimatePresence>
  </div>
 );
};
export default Showcase;