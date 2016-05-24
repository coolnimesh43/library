
package com.lftechnology.library.dao;

import com.lftechnology.library.model.Album;
import com.lftechnology.library.model.Video;

public interface AlbumDAO extends GenericDAO<Album, Long> {

    Album saveVideo(Video video, Long albumId);
}
