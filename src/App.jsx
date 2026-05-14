import React, { useEffect, useMemo, useState } from "react";
import { Car, Plus, Search, Trash2, GripVertical, X } from "lucide-react";
import { supabase } from "./supabase";

const columns = [
  { key: "purchased", title: "Purchased", color: "#3b82f6" },
  { key: "ready", title: "Ready For Pick Up", color: "#22c55e" },
  { key: "arbitration", title: "Arbitration", color: "#a855f7" },
  { key: "cancelled", title: "Cancelled Sale", color: "#f97316" }
];

const auctions = ["Windsor", "Toronto", "Kitchener", "Openlane"];

const auctionStyles = {
  Windsor: {
    color: "#3b82f6",
    background: "linear-gradient(135deg, #93c5fd, #3b82f6)",
    text: "#06101f"
  },
  Toronto: {
    color: "#22c55e",
    background: "linear-gradient(135deg, #86efac, #22c55e)",
    text: "#06150c"
  },
  Kitchener: {
    color: "#f59e0b",
    background: "linear-gradient(135deg, #fcd34d, #d97706)",
    text: "#140b02"
  },
  Openlane: {
    color: "#a855f7",
    background: "linear-gradient(135deg, #c084fc, #7e22ce)",
    text: "#09030f"
  }
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "#08111d",
    color: "#f8fafc",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "12px",
    boxSizing: "border-box",
    overflowX: "hidden"
  },
  app: {
    width: "100%",
    maxWidth: "100%",
    margin: "0",
    transform: "none",
    transformOrigin: "top left"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "26px"
  },
  logoBox: {
    width: "70px",
    height: "70px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.42)",
    background: "rgba(15, 23, 42, 0.72)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "36px",
    lineHeight: "1.1",
    fontWeight: "900",
    margin: 0,
    letterSpacing: "-0.04em",
    color: "#ffffff"
  },
  subtitle: {
    margin: "8px 0 0 0",
    color: "#d1d5db",
    fontSize: "18px"
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "260px minmax(0, 1fr)",
    gap: "10px",
    alignItems: "start"
  },
  sidebar: {
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.32)",
    background: "#111c2b",
    padding: "22px",
    boxSizing: "border-box"
  },
  sectionTitle: {
    fontSize: "16px",
    textTransform: "uppercase",
    fontWeight: "900",
    margin: "0 0 24px 0",
    letterSpacing: "0.01em",
    color: "#ffffff"
  },
  label: {
    display: "block",
    fontWeight: "800",
    fontSize: "16px",
    marginBottom: "10px",
    color: "#ffffff"
  },
  textarea: {
    width: "100%",
    minHeight: "135px",
    resize: "vertical",
    boxSizing: "border-box",
    borderRadius: "9px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "#0b1322",
    color: "#f8fafc",
    padding: "14px",
    fontSize: "16px",
    lineHeight: "1.45",
    outline: "none"
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "9px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "#0b1322",
    color: "#f8fafc",
    padding: "13px",
    fontSize: "16px",
    outline: "none"
  },
  addButton: {
    width: "100%",
    border: "none",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    fontWeight: "900",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px"
  },
  divider: {
    height: "1px",
    background: "rgba(148, 163, 184, 0.24)",
    margin: "28px 0"
  },
  searchWrap: {
    position: "relative"
  },
  searchIcon: {
    position: "absolute",
    left: "13px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8"
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "9px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "#0b1322",
    color: "#f8fafc",
    padding: "13px 13px 13px 44px",
    fontSize: "16px",
    outline: "none"
  },
  errorBox: {
    background: "#7f1d1d",
    color: "#fee2e2",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "14px"
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
    fontSize: "17px",
    fontWeight: "800",
    color: "#ffffff"
  },
  legendDot: {
    width: "22px",
    height: "22px",
    borderRadius: "999px",
    display: "inline-block"
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
    gap: "10px",
    width: "100%"
  },
  column: {
    minHeight: "680px",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.32)",
    background: "#111c2b",
    padding: "14px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "visible"
  },
  columnAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "5px",
    borderTopLeftRadius: "14px",
    borderTopRightRadius: "14px"
  },
  columnHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "28px 4px 24px 4px",
    textAlign: "center"
  },
  columnTitle: {
    margin: 0,
    fontSize: "20px",
    lineHeight: "1.15",
    fontWeight: "950",
    textTransform: "uppercase",
    letterSpacing: "-0.04em",
    color: "#ffffff"
  },
  count: {
    minWidth: "34px",
    height: "34px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "950",
    fontSize: "17px",
    color: "#ffffff",
    flexShrink: 0
  },
  dropArea: {
    border: "1px dashed rgba(148, 163, 184, 0.42)",
    borderRadius: "14px",
    minHeight: "540px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    color: "#cbd5e1",
    fontSize: "18px"
  },
  vehicleCard: {
    borderRadius: "10px",
    padding: "18px 12px",
    marginBottom: "16px",
    cursor: "grab",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.18)",
    boxSizing: "border-box",
    minHeight: "110px"
  },
  vehicleTop: {
    display: "grid",
    gridTemplateColumns: "18px 1fr 20px",
    gap: "10px",
    alignItems: "start"
  },
  vehicleInfo: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.45",
    fontWeight: "950",
    letterSpacing: "-0.03em",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    textAlign: "left"
  },
  deleteButton: {
    border: "none",
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
    padding: "0",
    opacity: 0.82
  },
  footer: {
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "18px",
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  },
  tooltip: {
    position: "absolute",
    top: "calc(100% + 16px)",
    left: "0",
    width: "285px",
    zIndex: 30,
    borderRadius: "10px",
    border: "1px solid rgba(148, 163, 184, 0.42)",
    background: "#0b1322",
    color: "#e5e7eb",
    padding: "17px",
    boxShadow: "0 24px 55px rgba(0,0,0,0.45)"
  },
  tooltipArrow: {
    position: "absolute",
    top: "-9px",
    left: "50%",
    transform: "translateX(-50%) rotate(45deg)",
    width: "16px",
    height: "16px",
    background: "#0b1322",
    borderLeft: "1px solid rgba(148, 163, 184, 0.42)",
    borderTop: "1px solid rgba(148, 163, 184, 0.42)"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.62)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },
  modal: {
    width: "430px",
    maxWidth: "100%",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.38)",
    background: "#111c2b",
    color: "#f8fafc",
    padding: "26px",
    boxShadow: "0 30px 90px rgba(0,0,0,0.6)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
    paddingBottom: "14px",
    borderBottom: "1px solid rgba(148, 163, 184, 0.22)"
  },
  modalTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "950",
    color: "#ffffff"
  },
  modalText: {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: "1.45"
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "18px"
  },
  cancelButton: {
    border: "1px solid rgba(148, 163, 184, 0.3)",
    borderRadius: "9px",
    background: "transparent",
    color: "#f8fafc",
    padding: "12px 22px",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "15px"
  },
  saveButton: {
    border: "none",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "#ffffff",
    padding: "12px 26px",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "15px"
  }
};

function dbVehicleToAppVehicle(vehicle) {
  return {
    id: vehicle.id,
    info: vehicle.info || "",
    auction: vehicle.auction || "Windsor",
    status: vehicle.status || "purchased",
    arbitrationReason: vehicle.arbitration_reason || ""
  };
}

export default function VehicleDeliveryTracker() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [auction, setAuction] = useState("Windsor");
  const [search, setSearch] = useState("");
  const [draggingId, setDraggingId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [arbitrationModal, setArbitrationModal] = useState(null);
  const [arbitrationReason, setArbitrationReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchVehicles();

    const channel = supabase
      .channel("vehicles-live-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        () => {
          fetchVehicles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchVehicles() {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    setVehicles((data || []).map(dbVehicleToAppVehicle));
  }

  const filteredVehicles = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return vehicles;
    return vehicles.filter((vehicle) =>
      `${vehicle.info} ${vehicle.auction} ${vehicle.arbitrationReason || ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [vehicles, search]);

  async function addVehicle(event) {
    event.preventDefault();
    if (!vehicleInfo.trim()) return;

    const { error } = await supabase.from("vehicles").insert({
      info: vehicleInfo.trim(),
      auction,
      status: "purchased",
      arbitration_reason: ""
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setVehicleInfo("");
    setAuction("Windsor");
    fetchVehicles();
  }

  async function moveVehicle(vehicleId, newStatus) {
    const vehicle = vehicles.find((item) => item.id === vehicleId);

    const { error } = await supabase
      .from("vehicles")
      .update({ status: newStatus })
      .eq("id", vehicleId);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    fetchVehicles();

    if (newStatus === "arbitration" && vehicle?.status !== "arbitration") {
      setArbitrationModal(vehicleId);
      setArbitrationReason(vehicle?.arbitrationReason || "");
    }
  }

  async function deleteVehicle(vehicleId) {
    const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    fetchVehicles();
  }

  function onDrop(columnKey) {
    if (draggingId) {
      moveVehicle(draggingId, columnKey);
      setDraggingId(null);
    }
  }

  async function saveArbitrationReason() {
    const { error } = await supabase
      .from("vehicles")
      .update({ arbitration_reason: arbitrationReason.trim() })
      .eq("id", arbitrationModal);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    setArbitrationModal(null);
    setArbitrationReason("");
    fetchVehicles();
  }

  function closeArbitrationModal() {
    setArbitrationModal(null);
    setArbitrationReason("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logoBox}>
            <Car size={36} color="#ffffff" />
          </div>
          <div>
            <h1 style={styles.title}>Vehicle Delivery Tracker</h1>
            <p style={styles.subtitle}>Track vehicles by status and auction source.</p>
          </div>
        </header>

        <div style={styles.layout}>
          <aside style={styles.sidebar}>
            <h2 style={styles.sectionTitle}>Add New Vehicle</h2>

            {errorMessage && <div style={styles.errorBox}>{errorMessage}</div>}

            <form onSubmit={addVehicle}>
              <label style={styles.label}>Vehicle Information</label>
              <textarea
                value={vehicleInfo}
                onChange={(event) => setVehicleInfo(event.target.value)}
                placeholder="Enter year, make, model, trim, VIN, notes, etc."
                style={styles.textarea}
              />

              <div style={{ height: "20px" }} />

              <label style={styles.label}>Auction Source</label>
              <select
                value={auction}
                onChange={(event) => setAuction(event.target.value)}
                style={styles.select}
              >
                {auctions.map((auctionName) => (
                  <option key={auctionName} value={auctionName}>
                    {auctionName}
                  </option>
                ))}
              </select>

              <button type="submit" style={styles.addButton}>
                <Plus size={22} /> Add Vehicle
              </button>
            </form>

            <div style={styles.divider} />

            <h2 style={styles.sectionTitle}>Search</h2>
            <div style={styles.searchWrap}>
              <Search size={21} style={styles.searchIcon} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vehicles or auction..."
                style={styles.input}
              />
            </div>

            <div style={styles.divider} />

            <h2 style={styles.sectionTitle}>Auction Colours</h2>
            {auctions.map((auctionName) => (
              <div key={auctionName} style={styles.legendItem}>
                <span
                  style={{
                    ...styles.legendDot,
                    background: auctionStyles[auctionName].color
                  }}
                />
                {auctionName}
              </div>
            ))}
          </aside>

          <main style={styles.board}>
            {columns.map((column) => {
              const columnVehicles = filteredVehicles.filter(
                (vehicle) => vehicle.status === column.key
              );

              return (
                <section
                  key={column.key}
                  style={styles.column}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => onDrop(column.key)}
                >
                  <div style={{ ...styles.columnAccent, background: column.color }} />

                  <div style={styles.columnHeader}>
                    <h2 style={styles.columnTitle}>{column.title}</h2>
                    <span style={{ ...styles.count, background: column.color }}>
                      {columnVehicles.length}
                    </span>
                  </div>

                  {columnVehicles.length === 0 ? (
                    <div style={styles.dropArea}>
                      <Car size={54} color="rgba(148, 163, 184, 0.62)" />
                      <span>Drag vehicles here</span>
                    </div>
                  ) : (
                    columnVehicles.map((vehicle) => {
                      const cardStyle = auctionStyles[vehicle.auction] || auctionStyles.Windsor;
                      const shouldShowTooltip =
                        vehicle.status === "arbitration" &&
                        hoveredId === vehicle.id &&
                        vehicle.arbitrationReason;

                      return (
                        <article
                          key={vehicle.id}
                          draggable
                          onDragStart={() => setDraggingId(vehicle.id)}
                          onDragEnd={() => setDraggingId(null)}
                          onMouseEnter={() => setHoveredId(vehicle.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{
                            ...styles.vehicleCard,
                            background: cardStyle.background,
                            color: cardStyle.text
                          }}
                        >
                          <div style={styles.vehicleTop}>
                            <GripVertical size={20} opacity={0.58} />
                            <p style={styles.vehicleInfo}>{vehicle.info}</p>
                            <button
                              type="button"
                              style={styles.deleteButton}
                              title="Delete vehicle"
                              onClick={() => deleteVehicle(vehicle.id)}
                            >
                              <Trash2 size={19} />
                            </button>
                          </div>

                          {shouldShowTooltip && (
                            <div style={styles.tooltip}>
                              <div style={styles.tooltipArrow} />
                              <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#ffffff" }}>
                                Arbitration Reason
                              </h3>
                              <p style={{ margin: 0, lineHeight: "1.55", color: "#cbd5e1" }}>
                                {vehicle.arbitrationReason}
                              </p>
                            </div>
                          )}
                        </article>
                      );
                    })
                  )}
                </section>
              );
            })}
          </main>
        </div>

        <footer style={styles.footer}>
          <GripVertical size={21} />
          Drag and drop vehicles between columns to update status.
        </footer>
      </div>

      {arbitrationModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add Reason for Arbitration</h2>
              <button
                type="button"
                onClick={closeArbitrationModal}
                style={{ border: "none", background: "transparent", color: "#cbd5e1", cursor: "pointer" }}
              >
                <X size={25} />
              </button>
            </div>

            <p style={styles.modalText}>
              Please provide a reason for arbitration for this vehicle.
            </p>

            <label style={styles.label}>Reason</label>
            <textarea
              value={arbitrationReason}
              onChange={(event) => setArbitrationReason(event.target.value)}
              placeholder="Enter reason for arbitration..."
              style={{ ...styles.textarea, minHeight: "110px" }}
              autoFocus
            />

            <div style={styles.modalButtons}>
              <button type="button" style={styles.cancelButton} onClick={closeArbitrationModal}>
                Cancel
              </button>
              <button type="button" style={styles.saveButton} onClick={saveArbitrationReason}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
