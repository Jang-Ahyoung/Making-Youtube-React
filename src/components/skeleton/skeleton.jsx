import React from 'react'
import styles from './skeleton.module.css';
export default function skeleton({ type }) {
    const COUNTER = 8;
    const FeedSkeleton = () => (
        <div className={styles.skeleton}>
            <div className={styles.Img}></div>
            <div className={styles.Info}>
                <div className={styles.Avatar}></div>
                <div className={styles.Detail}>
                    <div className={styles.Text}></div>
                    <div className={styles.Text_sm}></div>
                </div>
            </div>
        </div>
    )

    if (type == "feed") return Array(COUNTER).fill(<FeedSkeleton />);
}