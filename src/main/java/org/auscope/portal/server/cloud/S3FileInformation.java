/*
 * This file is part of the AuScope Virtual Rock Lab (VRL) project.
 * Copyright (c) 2009 ESSCC, The University of Queensland
 *
 * Licensed under the terms of the GNU Lesser General Public License.
 */
package org.auscope.portal.server.cloud;

import java.io.Serializable;

/**
 * Simple bean class that stores information about a file in S3.
 *
 * @author Cihan Altinay
 * @author Joshua Vote
 */
public class S3FileInformation implements Serializable {
	private static final long serialVersionUID = 6240194652206852285L;
	/** The file size in bytes */
    private long size;
    /** AWS S3 storage key */
    private String s3Key = "";
    /** URL where the file can be accessed by anyone (only valid if file is publicly readable) */
    private String publicUrl = "";

    /**
     * Constructor with name and size
     */
    public S3FileInformation(String s3Key, long size, String publicUrl) {
        this.s3Key = s3Key;
        this.size = size;
        this.publicUrl = publicUrl;
    }
    
    /**
     * Returns the filename.
     *
     * @return The filename.
     */
    public String getName() {
    	String [] keyParts = s3Key.split("/");
    	return keyParts[keyParts.length-1];
    }


    /**
     * Returns the file size.
     *
     * @return The file size in bytes.
     */
    public long getSize() {
        return size;
    }

	/**
	 * Gets the underlying S3 key representing this file
	 * @return
	 */
	public String getS3Key() {
		return s3Key;
	}

	/**
	 * Sets the underlying S3 key representing this file
	 * @param s3Key
	 */
	public void setS3Key(String s3Key) {
		this.s3Key = s3Key;
	}

	/**
	 * Gets the public URL where this file can be accessed (assuming the file has its ACL set
	 * to public read)
	 * @return
	 */
    public String getPublicUrl() {
        return publicUrl;
    }

    /**
     * Sets the public URL where this file can be accessed (assuming the file has its ACL set
     * to public read)
     * @param publicUrl
     */
    public void setPublicUrl(String publicUrl) {
        this.publicUrl = publicUrl;
    }

}

