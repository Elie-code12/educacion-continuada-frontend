import { useState, useEffect } from 'react';
import { enrollCourse } from '../../services/enrollmentService';
import { Country, State, City } from 'country-state-city';

export const useFormularioInscripcion = (curso) => {
    const isDiplomadoGrado = curso?.category === 'DIPLOMADOS DE OPCION DE GRADO';
    const isSeminarioIngles = curso?.category === 'SEMINARIOS DE INGLES';

    const [pasoActual, setPasoActual] = useState(1);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    const [isUtStudent, setIsUtStudent] = useState(isDiplomadoGrado ? 'yes' : 'no');
    const [hasDegree, setHasDegree] = useState('no');
    const [isUtGraduate, setIsUtGraduate] = useState('no');

    const initialStateUbicacion = { paisCode: '', paisName: '', deptoCode: '', deptoName: '', ciudadName: '' };
    const [lugarExpedicion, setLugarExpedicion] = useState(initialStateUbicacion);
    const [lugarResidencia, setLugarResidencia] = useState(initialStateUbicacion);

    const [titulos, setTitulos] = useState({ pregrado: '', especializacion: '', maestria: '', doctorado: '' });
    const [titulosActivos, setTitulosActivos] = useState([]);
    
    const [terminosAceptados, setTerminosAceptados] = useState(false);

    const [formData, setFormData] = useState({
        full_name: '', doc_type: '', doc_number: '', birth_date: '', age: '',
        address: '', personal_email: '', phone_number: '', blood_type: '', gender: '',
        institutional_email: '', student_code: '', academic_program: '', semester: '', schedule: ''
    });

    const [files, setFiles] = useState({ id_document: null, approval_document: null });

    const paisesDisponibles = Country.getAllCountries();
    const getDepartamentos = (paisCode) => paisCode ? State.getStatesOfCountry(paisCode) : [];
    const getCiudades = (paisCode, deptoCode) => (paisCode && deptoCode) ? City.getCitiesOfState(paisCode, deptoCode) : [];

    useEffect(() => {
        if (isDiplomadoGrado) {
            setIsUtStudent('yes');
        }
    }, [isDiplomadoGrado]);

    useEffect(() => {
        if (formData.birth_date) {
            const birthDate = new Date(formData.birth_date);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            setFormData(prev => ({ ...prev, age: calculatedAge.toString() }));
        }
    }, [formData.birth_date]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (tipo, campo, valor) => {
        const setLocation = tipo === 'expedicion' ? setLugarExpedicion : setLugarResidencia;

        setLocation(prev => {
            const newState = { ...prev };
            if (campo === 'pais') {
                newState.paisCode = valor;
                newState.paisName = Country.getCountryByCode(valor)?.name || '';
                newState.deptoCode = '';
                newState.deptoName = '';
                newState.ciudadName = '';
            } else if (campo === 'departamento') {
                newState.deptoCode = valor;
                newState.deptoName = State.getStateByCodeAndCountry(valor, prev.paisCode)?.name || '';
                newState.ciudadName = '';
            } else if (campo === 'ciudad') {
                newState.ciudadName = valor; 
            }
            return newState;
        });
    };

    const handleTitulosChange = (tipo, valor) => setTitulos(prev => ({ ...prev, [tipo]: valor }));

    const agregarCampoTitulo = (tipo) => {
        if (tipo && !titulosActivos.includes(tipo)) {
            setTitulosActivos(prev => [...prev, tipo]);
        }
    };

    const removerCampoTitulo = (tipo) => {
        setTitulosActivos(prev => prev.filter(t => t !== tipo));
        setTitulos(prev => ({ ...prev, [tipo]: '' }));
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles.length > 0) setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    };

    const validarPaso1 = () => {
        return Boolean(
            formData.full_name && formData.doc_type && formData.doc_number &&
            formData.birth_date && formData.expedition_date && formData.address &&
            formData.personal_email && formData.phone_number && formData.blood_type &&
            formData.gender && files.id_document &&
            lugarExpedicion.ciudadName && lugarResidencia.ciudadName
        );
    };

    const validarPaso2 = () => {
        let valido = true;
        if (isUtStudent === 'yes') {
            if (!formData.institutional_email || !formData.student_code || !formData.academic_program || !formData.semester) {
                valido = false;
            }
        }
        if (hasDegree === 'yes') {
            if (titulosActivos.length === 0) valido = false;
            for (let tipo of titulosActivos) {
                if (!titulos[tipo]) valido = false;
            }
        }
        return valido;
    };

    const validarPaso3 = () => {
        let valido = true;
        
     
        if (isDiplomadoGrado && !files.approval_document) valido = false;
        
        // AQUÍ ESTÁ LA MAGIA: Solo exige horario si NO es grado, NO es inglés, Y EL CURSO TIENE HORARIOS
        if (!isDiplomadoGrado && !isSeminarioIngles) {
            const elCursoTieneHorarios = curso?.schedules && curso.schedules.length > 0;
            if (elCursoTieneHorarios && !formData.schedule) {
                valido = false;
            }
        }
        
        if (!terminosAceptados) valido = false;
        return valido;
    };

    const isPasoValido = () => {
        if (pasoActual === 1) return validarPaso1();
        if (pasoActual === 2) return validarPaso2();
        if (pasoActual === 3) return validarPaso3();
        return false;
    };

    const siguientePaso = () => {
        if (isPasoValido()) {
            setPasoActual(prev => Math.min(prev + 1, 3));
        }
    };

    const pasoAnterior = () => setPasoActual(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pasoActual !== 3 || !isPasoValido()) { return; }

        setCargando(true);
        setError('');

        const data = new FormData();
        data.append('course_id', curso.id);
        
        const formatoUbicacion = (lugar) => `${lugar.paisName} / ${lugar.deptoName} / ${lugar.ciudadName}`;
        data.append('expedition_place', formatoUbicacion(lugarExpedicion));
        data.append('city', formatoUbicacion(lugarResidencia)); 
        
        const baseFields = ['full_name', 'doc_type', 'doc_number', 'birth_date', 'age', 'expedition_date', 'address', 'personal_email', 'phone_number', 'blood_type', 'gender', 'schedule'];
        baseFields.forEach(field => { data.append(field, formData[field] || ''); });

        data.append('extra_details[is_ut_student]', isUtStudent);
        if (isUtStudent === 'yes') {
            data.append('institutional_email', formData.institutional_email);
            data.append('extra_details[student_code]', formData.student_code);
            data.append('extra_details[academic_program]', formData.academic_program);
            data.append('extra_details[semester]', formData.semester);
        }

        data.append('extra_details[has_degree]', hasDegree);
        if (hasDegree === 'yes') {
            const gradosAgregados = [];
            if (titulosActivos.includes('pregrado') && titulos.pregrado) gradosAgregados.push(`Pregrado: ${titulos.pregrado}`);
            if (titulosActivos.includes('especializacion') && titulos.especializacion) gradosAgregados.push(`Especialización: ${titulos.especializacion}`);
            if (titulosActivos.includes('maestria') && titulos.maestria) gradosAgregados.push(`Maestría: ${titulos.maestria}`);
            if (titulosActivos.includes('doctorado') && titulos.doctorado) gradosAgregados.push(`Doctorado: ${titulos.doctorado}`);
            
            data.append('extra_details[degrees_info]', gradosAgregados.join(' | '));
            data.append('extra_details[is_ut_graduate]', isUtGraduate);
        }

        if (files.id_document) data.append('id_document', files.id_document);
        // También corregí un pequeño error de tipeo que tenías aquí ("fAiles" por "files")
        if (files.approval_document) data.append('approval_document', files.approval_document);

        try {
            await enrollCourse(data);
            setExito(true);
        } catch (err) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                const mensajes = Object.values(err.response.data.errors).flat().join(' - ');
                setError(`Por favor, verifique la información ingresada: ${mensajes}`);
            } 
            else if (err.response?.status === 500) {
                setError('Se ha presentado un error interno en el servidor. Por favor, contacte a soporte técnico si el problema persiste.');
            } 
            else {
                setError(err.response?.data?.message || 'No fue posible procesar su solicitud en este momento. Inténtelo de nuevo más tarde.');
            }
        } finally {
            setCargando(false);
        }
    };

    return {
        isDiplomadoGrado, isSeminarioIngles,
        pasoActual, cargando, error, exito, 
        isUtStudent, setIsUtStudent, hasDegree, setHasDegree, isUtGraduate, setIsUtGraduate,
        formData, lugarExpedicion, lugarResidencia, 
        titulos, titulosActivos, agregarCampoTitulo, removerCampoTitulo,
        terminosAceptados, setTerminosAceptados,
        paisesDisponibles, getDepartamentos, getCiudades,
        handleInputChange, handleLocationChange, handleTitulosChange, handleFileChange,
        siguientePaso, pasoAnterior, handleSubmit, isPasoValido
    };
};