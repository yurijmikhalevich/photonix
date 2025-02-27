import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import useLocalStorageState from 'use-local-storage-state'

import history from '../history'
import ZoomableImage from './ZoomableImage'
import PhotoMetadata from './PhotoMetadata'
import { getPrevNextPhotos } from '../stores/photos/selector'

import { ReactComponent as ArrowBackIcon } from '../static/images/arrow_back.svg'
import { ReactComponent as ArrowLeftIcon } from '../static/images/arrow_left.svg'
import { ReactComponent as ArrowRightIcon } from '../static/images/arrow_right.svg'
import { ReactComponent as InfoIcon } from '../static/images/info.svg'
import { ReactComponent as CloseIcon } from '../static/images/close.svg'

// const I_KEY = 73
const LEFT_KEY = 37
const RIGHT_KEY = 39

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  background-color: #1b1b1b;

  .content {
    width: 110vw;
    height: 100vh;
    overflow: auto;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
  }

  .backIcon {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    z-index: 10;
    svg {
      filter: invert(0.9);
    }
  }
  .prevNextIcons {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    transition: opacity 250ms;
    svg {
      filter: invert(0.9);
      cursor: pointer;
      padding: 10vh 10px;
      width: 48px;
      height: 25vh;
      position: absolute;
      top: 37.5vh;
      &.prevArrow {
        left: 0;
      }
      &.nextArrow {
        right: 0;
      }
    }
  }
  .showDetailIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    filter: invert(0.9);
    cursor: pointer;
    z-index: 10;
  }

  /* When two boxes can no longer fit next to each other */
  @media all and (max-width: 500px) {
    .metadata .boxes .box {
      width: 100%;
    }
    .metadata .boxes .histogram {
      margin-right: 40px;
    }
    .metadata .boxes .map {
      margin-right: 40px;
    }
  }
`

const PhotoDetail = ({ photoId, photo, refetch }) => {
  const [showBoundingBox, setShowBoundingBox] = useLocalStorageState(
    'showObjectBoxes',
    true
  )
  const [showMetadata, setShowMetadata] = useState(false)
  const [showPrevNext, setShowPrevNext] = useState(false)
  const prevNextPhotos = useSelector((state) =>
    getPrevNextPhotos(state, photoId)
  )

  // TODO: Bring this back so it doesn't get triggered by someone adding a tag with 'i' in it
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     switch (event.keyCode) {
  //       case I_KEY:
  //         setShowMetadata(!showMetadata)
  //         break
  //       default:
  //         break
  //     }
  //   }

  //   document.addEventListener('keydown', handleKeyDown)

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [showMetadata])

  const prevPhoto = () => {
    let id = prevNextPhotos.prev[0]
    id && history.push(`/photo/${id}`)
  }
  const nextPhoto = () => {
    let id = prevNextPhotos.next[0]
    id && history.push(`/photo/${id}`)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case LEFT_KEY:
          prevPhoto()
          break
        case RIGHT_KEY:
          nextPhoto()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [photoId, prevNextPhotos])

  let boxes = photo?.objectTags.map((objectTag) => {
    return {
      name: objectTag.tag.name,
      positionX: objectTag.positionX,
      positionY: objectTag.positionY,
      sizeX: objectTag.sizeX,
      sizeY: objectTag.sizeY,
    }
  })

  const url = `/thumbnailer/photo/3840x3840_contain_q75/${photoId}/`

  return (
    <Container>
      <ZoomableImage url={url} boxes={showBoundingBox && boxes} />
      <div
        className="backIcon"
        title="Press [Esc] key to go back to photo list"
      >
        <ArrowBackIcon alt="Close" onClick={() => history.push('/')} />
      </div>
      <div className="prevNextIcons" style={{ opacity: showPrevNext ? 1 : 0 }}>
        <ArrowLeftIcon
          alt="Previous"
          className="prevArrow"
          onClick={prevPhoto}
          onMouseOver={() => setShowPrevNext(true)}
          onMouseOut={() => setShowPrevNext(false)}
          title="Use [←] left/right [→] arrow keys to quickly go to the previous/next photo"
        />
        <ArrowRightIcon
          alt="Previous"
          className="nextArrow"
          onClick={nextPhoto}
          onMouseOver={() => setShowPrevNext(true)}
          onMouseOut={() => setShowPrevNext(false)}
          title="Use [←] left/right [→] arrow keys to quickly go to the previous/next photo"
        />
      </div>
      {photo && (
        <PhotoMetadata
          photo={photo}
          show={showMetadata}
          refetch={refetch}
          showBoundingBox={showBoundingBox}
          setShowBoundingBox={setShowBoundingBox}
        />
      )}
      {!showMetadata ? (
        <InfoIcon
          className="showDetailIcon"
          height="30"
          width="30"
          onClick={() => setShowMetadata(!showMetadata)}
          // title="Press [I] key to show/hide photo details"
        />
      ) : (
        <CloseIcon
          className="showDetailIcon"
          height="30"
          width="30"
          onClick={() => setShowMetadata(!showMetadata)}
          // title="Press [I] key to show/hide photo details"
        />
      )}
    </Container>
  )
}

export default PhotoDetail
