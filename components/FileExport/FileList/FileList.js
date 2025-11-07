/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Styles } from '@material-ui/core/styles/withStyles'
import React from 'react'
import FileItem from '../FileItem/FileItem'
import styles from './fileList.module.css'

const FileList = ({ files, removeFile }) => {
	const deleteFileHandler = (_name) => {
		console.log('file deletee')
		removeFile(_name)
	}
	return (
		<div className={styles.filesList}>
			{
				files && (
					files.map((f, index) => {
						return (
							<FileItem
								key={f.name}
								file={f}
								deleteFile={deleteFileHandler}
							/>
						)
					}))
			}
		</div>
	)
}

export default FileList
