import React from 'react';
import { Pagination as AntPagination } from 'antd';
import styles from './Pagination.module.scss';

interface PaginationProps {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, pageSize, onChange }) => {
    return (
        <AntPagination
            current={current}
            total={total}
            pageSize={10}
            onChange={onChange}
            showSizeChanger={false}
            className={styles.pagination}
        />
    );
};

export default Pagination;
