import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const homeStyles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F6FF",
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  headerContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2933",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#52606D",
  },
  welcomeEmail: {
    fontWeight: "600",
    color: "#3B82F6",
  },
  logoutButton:{
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2933",
    marginBottom: 12,
  },
  tasksCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E1E7F0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tasksPlaceholder: {
    fontSize: 14,
    color: "#6B7280",
  },
  newTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  newTaskInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 14,
  },
  addIconButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  }
});
