import React, { useEffect, useState } from "react";
import { db } from "../js/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const supplierRef = collection(db, "suppliers");
      const data = await getDocs(supplierRef);
      setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف المورد؟")) {
      try {
        await deleteDoc(doc(db, "suppliers", id));
        fetchSuppliers();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">قائمة الموردين</h1>
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الهاتف</th>
            <th>المدينة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.city}</td>
              <td>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="btn btn-primary"
                >
                  🗑 حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
