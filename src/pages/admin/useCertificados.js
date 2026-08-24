import { useState, useEffect } from 'react';
import { 
    getCertificates, 
    getStudentData, 
    uploadCertificate, 
    deleteCertificate, 
    downloadCertificatePdf 
} from '../../services/certificateService';
import { getCourses } from '../../services/courseService'; 

export const useCertificados = () => {
    const [certificados, setCertificados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState(null);
    const [descargandoPdfId, setDescargandoPdfId] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [modoManual, setModoManual] = useState(false);
    const [todosLosCursos, setTodosLosCursos] = useState([]);

    const [docNumber, setDocNumber] = useState('');
    const [buscando, setBuscando] = useState(false);
    const [studentData, setStudentData] = useState(null);
    
    const [datosManuales, setDatosManuales] = useState({
        student_name: '',
        doc_type: '',
        expedition_date: ''
    });

    const [selectedCourse, setSelectedCourse] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarCertificados();
        cargarTodosLosCursos();
    }, []);

    const mostrarAlerta = (tipo, texto) => {
        setAlerta({ tipo, texto });
        setTimeout(() => setAlerta(null), 4000);
    };

    const cargarCertificados = async () => {
        try {
            setCargando(true);
            const res = await getCertificates();
            setCertificados(res.data || []);
        } catch (error) {
            mostrarAlerta('error', 'Error al cargar los certificados de la base de datos.');
        } finally {
            setCargando(false);
        }
    };

    const cargarTodosLosCursos = async () => {
        try {
            const res = await getCourses();
            setTodosLosCursos(res.data?.data || res.data || []);
        } catch (error) {
            console.error("Error cargando cursos", error);
        }
    };

    const handleBuscarEstudiante = async (e) => {
        if (e) e.preventDefault(); 
        if (!docNumber.trim()) {
            mostrarAlerta('error', 'Por favor ingrese un número de documento.');
            return;
        }
        
        setBuscando(true);
        setStudentData(null);
        setSelectedCourse('');
        
        try {
            const res = await getStudentData(docNumber);
            
            if (res.data && res.data.courses && res.data.courses.length > 0) {
                setStudentData(res.data);
                
                const cursoSinCertificar = res.data.courses.find(c => !c.has_certificate);
                
                if (cursoSinCertificar) {
                    setSelectedCourse(cursoSinCertificar.id);
                } else {
                    setSelectedCourse('');
                    mostrarAlerta('exito', 'Este estudiante ya tiene generados los certificados de todos sus programas aprobados.');
                }
            } else {
                mostrarAlerta('error', 'El estudiante no tiene programas aprobados para certificar.');
            }
        } catch (error) {
            mostrarAlerta('error', error.response?.data?.message || 'Estudiante no encontrado en el sistema.');
        } finally {
            setBuscando(false);
        }
    };

    const handleDatosManualesChange = (e) => {
        setDatosManuales({
            ...datosManuales,
            [e.target.name]: e.target.value
        });
    };

    const handleSubir = async (e) => {
        e.preventDefault();
        
        if (!selectedCourse || !pdfFile) return;
        if (!modoManual && !studentData) return;
        if (modoManual && (!datosManuales.student_name || !datosManuales.doc_type || !docNumber || !datosManuales.expedition_date)) {
            mostrarAlerta('error', 'Complete todos los campos manuales.');
            return;
        }

        setGuardando(true);
        const formData = new FormData();
        formData.append('course_id', selectedCourse);
        formData.append('pdf_file', pdfFile);
        formData.append('doc_number', docNumber);

        if (modoManual) {
            formData.append('doc_type', datosManuales.doc_type);
            formData.append('student_name', datosManuales.student_name);
            formData.append('expedition_date', datosManuales.expedition_date);
        } else {
            formData.append('doc_type', studentData.doc_type);
            formData.append('student_name', studentData.student_name);
            formData.append('expedition_date', studentData.expedition_date);
        }

        try {
            await uploadCertificate(formData);
            mostrarAlerta('exito', '¡Certificado subido correctamente!');
            cerrarModal();
            cargarCertificados();
        } catch (error) {
            console.error("Error al subir:", error);
            mostrarAlerta('error', 'Ocurrió un error al intentar subir el PDF.');
        } finally {
            setGuardando(false);
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este certificado definitivamente?')) return;
        try {
            await deleteCertificate(id);
            setCertificados(prev => prev.filter(c => c.id !== id));
            mostrarAlerta('exito', 'Certificado eliminado correctamente.');
        } catch (error) {
            mostrarAlerta('error', 'Hubo un error al intentar eliminar el certificado.');
        }
    };

    const handleVerPdf = async (id) => {
        setDescargandoPdfId(id);
        try {
            const response = await downloadCertificatePdf(id);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
            setTimeout(() => window.URL.revokeObjectURL(url), 2000);
        } catch (error) {
            mostrarAlerta('error', 'Error al intentar abrir el PDF.');
        } finally {
            setDescargandoPdfId(null);
        }
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setDocNumber('');
        setStudentData(null);
        setSelectedCourse('');
        setPdfFile(null);
        setBuscando(false);
        setGuardando(false);
        setModoManual(false);
        setDatosManuales({ student_name: '', doc_type: '', expedition_date: '' });
    };

    return {
        certificados, cargando, alerta, descargandoPdfId,
        modalAbierto, setModalAbierto, docNumber, setDocNumber,
        buscando, studentData, selectedCourse, setSelectedCourse,
        pdfFile, setPdfFile, guardando,
        modoManual, setModoManual, datosManuales, handleDatosManualesChange, todosLosCursos,
        handleBuscarEstudiante, handleSubir, handleEliminar, handleVerPdf, cerrarModal
    };
};