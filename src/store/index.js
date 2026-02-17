/**
 * Store dla stanu aplikacji (Pinia-like)
 */

export const createStore = () => {
  return {
    // State
    state: {
      classes: [],
      teachers: [],
      currentClass: null,
      schedule: null,
      substitutions: [],
      selectedGroup: null,
      theme: 'dark',
      lastVisited: localStorage.getItem('lastVisitedClass'),
      schedules: {} // Wszystkie załadowane plany
    },

    // Actions
    setClasses(classes) {
      this.state.classes = classes;
    },

    setTeachers(teachers) {
      this.state.teachers = teachers;
    },

    setSchedule(schedule) {
      this.state.schedule = schedule;
      this.state.currentClass = schedule.className;
      localStorage.setItem('lastVisitedClass', schedule.className);
    },

    setSchedules(schedules) {
      this.state.schedules = schedules;
    },

    setSubstitutions(subs) {
      this.state.substitutions = subs;
    },

    setSelectedGroup(group) {
      this.state.selectedGroup = group;
    },

    getTeacherByInitials(initials) {
      return this.state.teachers.find(t => t.initials === initials);
    },

    getTeacherPhoto(initials) {
      const teacher = this.getTeacherByInitials(initials);
      if (!teacher) return null;
      
      return teacher.photoPath || `/nauczyciele/${initials.toLowerCase()}.jpg`;
    }
  };
};
