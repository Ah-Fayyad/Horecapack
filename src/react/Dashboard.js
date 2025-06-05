import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container">
      <h1 className="page-title">لوحة التحكم</h1>
      <div className="features-section">
        <div className="feature-card">
          <h3>إدارة الموردين</h3>
          <p>عرض وإدارة قائمة الموردين</p>
          <Link to="/suppliers" className="btn btn-primary">
            عرض الموردين
          </Link>
        </div>
        <div className="feature-card">
          <h3>طلبات عروض الأسعار</h3>
          <p>إنشاء ومتابعة طلبات عروض الأسعار</p>
          <Link to="/pages/client.html" className="btn btn-primary">
            طلب عرض سعر
          </Link>
        </div>
      </div>
    </div>
  );
}
