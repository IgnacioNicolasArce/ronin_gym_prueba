import React, { createContext, useContext, useState } from 'react';
import { DASHBOARD_DATA, MACHINES, ROUTINES } from '../data/gymData';

const GymContext = createContext(null);

const DAY_NAMES = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

function canManageContent(user) {
  return user && (user.role === 'profesor' || user.role === 'admin');
}

function withDefaultSplit(routine) {
  if (routine.split && routine.split.length > 0) {
    return routine;
  }

  const safeDays = Math.max(1, Math.min(6, Number(routine.days) || 3));
  const split = DAY_NAMES.slice(0, safeDays).map((day) => ({
    day,
    muscles: [],
    exercises: 0,
  }));

  return { ...routine, split };
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function nextNumericId(items, idKey = 'id') {
  if (!items.length) return 1;
  return Math.max(...items.map((item) => Number(item[idKey]) || 0)) + 1;
}

const PRIMARY_EXERCISES = [
  'Press plano',
  'Press inclinado',
  'Press militar',
  'Peso muerto',
  'Sentadilla',
  'Hip thrust',
];

export function GymProvider({ children }) {
  const [machines, setMachines] = useState(
    MACHINES.map((machine) => ({
      ...machine,
      createdBy: 'Sistema',
      updatedBy: 'Sistema',
    }))
  );

  const [publicRoutines, setPublicRoutines] = useState(
    ROUTINES.map((routine) => ({
      ...withDefaultSplit(routine),
      isPublic: true,
      status: 'aprobada',
      createdBy: 'Sistema',
      updatedBy: 'Sistema',
    }))
  );

  const [personalRoutinesByUser, setPersonalRoutinesByUser] = useState({});
  const [activeRoutineByUser, setActiveRoutineByUser] = useState({
    1: { source: 'public', routineId: 2 },
  });
  const [pendingRoutineSubmissions, setPendingRoutineSubmissions] = useState([]);
  const [exerciseLogsByUser, setExerciseLogsByUser] = useState({});
  const [activityByUser, setActivityByUser] = useState({});

  const [lockers, setLockers] = useState([...DASHBOARD_DATA.lockers]);
  const [stock, setStock] = useState([...DASHBOARD_DATA.stock]);

  const addActivity = (user, message) => {
    if (!user) return;
    setActivityByUser((prev) => {
      const current = prev[user.id] || [];
      const next = [{ id: `${Date.now()}-${Math.random()}`, date: todayIso(), message }, ...current];
      return { ...prev, [user.id]: next.slice(0, 20) };
    });
  };

  const createMachine = (payload, user) => {
    if (!canManageContent(user)) return false;

    const nextMachine = {
      id: nextNumericId(machines),
      name: payload.name?.trim() || 'Maquina sin nombre',
      muscle: payload.muscle?.trim() || 'General',
      description: payload.description?.trim() || 'Sin descripcion',
      videoUrl: payload.videoUrl?.trim() || 'https://www.youtube.com/',
      category: payload.category?.trim() || 'General',
      createdBy: user.name,
      updatedBy: user.name,
    };

    setMachines((prev) => [...prev, nextMachine]);
    addActivity(user, `Creo la maquina ${nextMachine.name}.`);
    return true;
  };

  const updateMachine = (machineId, payload, user) => {
    if (!canManageContent(user)) return false;

    let changed = false;
    setMachines((prev) =>
      prev.map((machine) => {
        if (machine.id !== machineId) return machine;
        changed = true;
        return {
          ...machine,
          ...payload,
          name: payload.name?.trim() || machine.name,
          muscle: payload.muscle?.trim() || machine.muscle,
          description: payload.description?.trim() || machine.description,
          videoUrl: payload.videoUrl?.trim() || machine.videoUrl,
          category: payload.category?.trim() || machine.category,
          updatedBy: user.name,
        };
      })
    );

    if (changed) {
      addActivity(user, `Edito la maquina #${machineId}.`);
    }

    return changed;
  };

  const deleteMachine = (machineId, user) => {
    if (!canManageContent(user)) return false;

    let removedName = null;
    setMachines((prev) =>
      prev.filter((machine) => {
        if (machine.id === machineId) {
          removedName = machine.name;
          return false;
        }
        return true;
      })
    );

    if (removedName) {
      addActivity(user, `Elimino la maquina ${removedName}.`);
      return true;
    }

    return false;
  };

  const createPublicRoutine = (payload, user) => {
    if (!canManageContent(user)) return false;

    const nextRoutine = withDefaultSplit({
      id: nextNumericId(publicRoutines),
      name: payload.name?.trim() || 'Rutina sin nombre',
      description: payload.description?.trim() || 'Sin descripcion',
      days: Number(payload.days) || 3,
      level: payload.level || 'Principiante',
      split: payload.split || [],
      status: 'aprobada',
      isPublic: true,
      createdBy: user.name,
      updatedBy: user.name,
    });

    setPublicRoutines((prev) => [...prev, nextRoutine]);
    addActivity(user, `Creo la rutina publica ${nextRoutine.name}.`);
    return true;
  };

  const updatePublicRoutine = (routineId, payload, user) => {
    if (!canManageContent(user)) return false;

    let changed = false;
    setPublicRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== routineId) return routine;
        changed = true;
        const merged = {
          ...routine,
          ...payload,
          name: payload.name?.trim() || routine.name,
          description: payload.description?.trim() || routine.description,
          days: Number(payload.days) || routine.days,
          level: payload.level || routine.level,
          split: payload.split || routine.split,
          updatedBy: user.name,
        };
        return withDefaultSplit(merged);
      })
    );

    if (changed) {
      addActivity(user, `Edito la rutina publica #${routineId}.`);
    }

    return changed;
  };

  const deletePublicRoutine = (routineId, user) => {
    if (!canManageContent(user)) return false;

    let removedName = null;
    setPublicRoutines((prev) =>
      prev.filter((routine) => {
        if (routine.id === routineId) {
          removedName = routine.name;
          return false;
        }
        return true;
      })
    );

    if (removedName) {
      addActivity(user, `Elimino la rutina publica ${removedName}.`);
      return true;
    }

    return false;
  };

  const savePersonalRoutine = (payload, user) => {
    if (!user) return null;

    const userRoutines = personalRoutinesByUser[user.id] || [];
    const hasId = Boolean(payload.id);

    let saved = null;
    const nextList = hasId
      ? userRoutines.map((routine) => {
          if (routine.id !== payload.id) return routine;
          saved = {
            ...routine,
            ...payload,
            name: payload.name?.trim() || routine.name,
            description: payload.description?.trim() || routine.description,
            days: Number(payload.days) || routine.days,
            level: payload.level || routine.level,
            split: payload.split || routine.split,
            status: routine.status === 'aprobada_publicada' ? 'aprobada_publicada' : 'borrador',
            updatedAt: todayIso(),
          };
          return withDefaultSplit(saved);
        })
      : (() => {
          const created = withDefaultSplit({
            id: Date.now(),
            name: payload.name?.trim() || 'Rutina personalizada',
            description: payload.description?.trim() || 'Sin descripcion',
            days: Number(payload.days) || 3,
            level: payload.level || 'Principiante',
            split: payload.split || [],
            status: 'borrador',
            ownerId: user.id,
            ownerName: user.name,
            sourcePublicId: payload.sourcePublicId || null,
            updatedAt: todayIso(),
          });
          saved = created;
          return [...userRoutines, created];
        })();

    setPersonalRoutinesByUser((prev) => ({ ...prev, [user.id]: nextList }));
    addActivity(user, hasId ? `Edito su rutina personal ${saved?.name || ''}.` : `Creo su rutina personal ${saved?.name || ''}.`);
    return saved;
  };

  const clonePublicRoutineToPersonal = (routineId, user) => {
    if (!user) return null;

    const found = publicRoutines.find((routine) => routine.id === routineId);
    if (!found) return null;

    const clone = {
      ...found,
      id: Date.now(),
      sourcePublicId: found.id,
      ownerId: user.id,
      ownerName: user.name,
      status: 'borrador',
      isPublic: false,
      updatedAt: todayIso(),
    };

    setPersonalRoutinesByUser((prev) => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), clone],
    }));

    addActivity(user, `Uso como base la rutina publica ${found.name}.`);
    return clone;
  };

  const setActiveRoutine = (source, routineId, user) => {
    if (!user) return false;
    setActiveRoutineByUser((prev) => ({ ...prev, [user.id]: { source, routineId } }));
    addActivity(user, 'Actualizo su rutina activa.');
    return true;
  };

  const submitRoutineForApproval = (routineId, user) => {
    if (!user) return false;

    const personalList = personalRoutinesByUser[user.id] || [];
    const routine = personalList.find((item) => item.id === routineId);
    if (!routine) return false;

    const alreadyPending = pendingRoutineSubmissions.some((item) => item.routineId === routineId && item.ownerId === user.id);
    if (alreadyPending) return false;

    const submission = {
      id: Date.now(),
      routineId,
      ownerId: user.id,
      ownerName: user.name,
      requestedAt: todayIso(),
      routine: { ...routine, status: 'pendiente' },
    };

    setPendingRoutineSubmissions((prev) => [submission, ...prev]);
    setPersonalRoutinesByUser((prev) => ({
      ...prev,
      [user.id]: personalList.map((item) =>
        item.id === routineId ? { ...item, status: 'pendiente', updatedAt: todayIso() } : item
      ),
    }));

    addActivity(user, `Envio a revision la rutina ${routine.name}.`);
    return true;
  };

  const approveRoutineSubmission = (submissionId, reviewer) => {
    if (!canManageContent(reviewer)) return false;

    const submission = pendingRoutineSubmissions.find((item) => item.id === submissionId);
    if (!submission) return false;

    const nextRoutine = withDefaultSplit({
      ...submission.routine,
      id: nextNumericId(publicRoutines),
      isPublic: true,
      status: 'aprobada',
      createdBy: submission.ownerName,
      updatedBy: reviewer.name,
    });

    setPublicRoutines((prev) => [...prev, nextRoutine]);
    setPendingRoutineSubmissions((prev) => prev.filter((item) => item.id !== submissionId));
    setPersonalRoutinesByUser((prev) => ({
      ...prev,
      [submission.ownerId]: (prev[submission.ownerId] || []).map((item) =>
        item.id === submission.routineId
          ? { ...item, status: 'aprobada_publicada', publishedRoutineId: nextRoutine.id, updatedAt: todayIso() }
          : item
      ),
    }));

    addActivity(reviewer, `Aprobo la rutina ${nextRoutine.name}.`);
    return true;
  };

  const addExerciseLog = (payload, user) => {
    if (!user) return false;

    const nextEntry = {
      id: Date.now(),
      exercise: payload.exercise,
      weight: Number(payload.weight) || 0,
      reps: Number(payload.reps) || 0,
      date: payload.date || todayIso(),
    };

    setExerciseLogsByUser((prev) => {
      const current = prev[user.id] || [];
      return { ...prev, [user.id]: [nextEntry, ...current].slice(0, 60) };
    });

    return true;
  };

  const addLocker = (payload) => {
    const number = Number(payload.number);
    if (!number || lockers.some((locker) => locker.number === number)) return false;

    const nextLocker = {
      number,
      member: payload.member?.trim() || 'Disponible',
      expires: payload.expires || todayIso(),
      active: Boolean(payload.active),
    };

    setLockers((prev) => [...prev, nextLocker].sort((a, b) => a.number - b.number));
    return true;
  };

  const updateLocker = (number, payload) => {
    let changed = false;
    setLockers((prev) =>
      prev.map((locker) => {
        if (locker.number !== number) return locker;
        changed = true;
        return {
          ...locker,
          member: payload.member?.trim() || locker.member,
          expires: payload.expires || locker.expires,
          active: payload.active ?? locker.active,
        };
      })
    );

    return changed;
  };

  const deleteLocker = (number) => {
    const before = lockers.length;
    setLockers((prev) => prev.filter((locker) => locker.number !== number));
    return before !== lockers.length;
  };

  const addStockItem = (payload) => {
    const itemName = payload.item?.trim();
    if (!itemName) return false;

    const exists = stock.some((item) => item.item.toLowerCase() === itemName.toLowerCase());
    if (exists) return false;

    const nextItem = {
      item: itemName,
      quantity: Number(payload.quantity) || 0,
      min: Number(payload.min) || 0,
      unit: payload.unit?.trim() || 'unidades',
    };

    setStock((prev) => [...prev, nextItem]);
    return true;
  };

  const updateStockItem = (itemName, payload) => {
    let changed = false;

    setStock((prev) =>
      prev.map((item) => {
        if (item.item !== itemName) return item;
        changed = true;
        return {
          ...item,
          item: payload.item?.trim() || item.item,
          quantity: payload.quantity !== undefined ? Number(payload.quantity) : item.quantity,
          min: payload.min !== undefined ? Number(payload.min) : item.min,
          unit: payload.unit?.trim() || item.unit,
        };
      })
    );

    return changed;
  };

  const adjustStock = (itemName, delta) => {
    let changed = false;

    setStock((prev) =>
      prev.map((item) => {
        if (item.item !== itemName) return item;
        changed = true;
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      })
    );

    return changed;
  };

  const removeStockItem = (itemName) => {
    const before = stock.length;
    setStock((prev) => prev.filter((item) => item.item !== itemName));
    return before !== stock.length;
  };

  const getPersonalRoutines = (user) => {
    if (!user) return [];
    return personalRoutinesByUser[user.id] || [];
  };

  const getActiveRoutineForUser = (user) => {
    if (!user) return null;

    const ref = activeRoutineByUser[user.id];
    if (!ref) return null;

    if (ref.source === 'public') {
      const routine = publicRoutines.find((item) => item.id === ref.routineId);
      return routine ? { source: 'public', routine } : null;
    }

    const routine = (personalRoutinesByUser[user.id] || []).find((item) => item.id === ref.routineId);
    return routine ? { source: 'personal', routine } : null;
  };

  const getExerciseLogs = (user) => {
    if (!user) return [];
    return exerciseLogsByUser[user.id] || [];
  };

  const getUserActivity = (user) => {
    if (!user) return [];
    return activityByUser[user.id] || [];
  };

  const contextValue = {
    primaryExercises: PRIMARY_EXERCISES,
    machines,
    publicRoutines,
    pendingRoutineSubmissions,
    lockers,
    stock,
    createMachine,
    updateMachine,
    deleteMachine,
    createPublicRoutine,
    updatePublicRoutine,
    deletePublicRoutine,
    savePersonalRoutine,
    clonePublicRoutineToPersonal,
    setActiveRoutine,
    submitRoutineForApproval,
    approveRoutineSubmission,
    addExerciseLog,
    addLocker,
    updateLocker,
    deleteLocker,
    addStockItem,
    updateStockItem,
    adjustStock,
    removeStockItem,
    getPersonalRoutines,
    getActiveRoutineForUser,
    getExerciseLogs,
    getUserActivity,
  };

  return <GymContext.Provider value={contextValue}>{children}</GymContext.Provider>;
}

export function useGym() {
  return useContext(GymContext);
}
