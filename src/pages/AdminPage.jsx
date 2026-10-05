import rrLogo from '@/assets/rr-logo.png';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import {
  Bell,
  Search,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Home,
  Building,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  X,
  Lock,
  Unlock,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Save,
  Check,
  Building2,
  ArrowUpRight,
  Sparkles,
  KeyRound,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { inquiryService } from '../services/inquiryService';
import { Button } from '../components/ui/Button';

// Play pleasant web audio chime on new notification
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    // Audio context may require user interaction first
  }
}

export function AdminPage() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser() || { username: 'admin', role: 'ROLE_ADMIN' };

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    convertedCount: 0,
    buyCount: 0,
    sellCount: 0,
    buildCount: 0,
    consultationCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [liveToast, setLiveToast] = useState(null);
  const knownIdsRef = useRef(new Set());
  const initialLoadRef = useRef(true);

  // Modal inspection
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    setPasswordLoading(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password updated successfully! Please remember your new credentials.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  // Fetch data from backend
  const loadData = async (isPoll = false) => {
    if (!isPoll) setRefreshing(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        inquiryService.getAllInquiries(),
        inquiryService.getInquiryStats()
      ]);

      const list = Array.isArray(listRes) ? listRes : [];
      setInquiries(list);
      setStats(statsRes || {});

      // Notification detection
      if (initialLoadRef.current) {
        list.forEach((item) => knownIdsRef.current.add(item.id));
        const newOnes = list.filter((i) => i.status === 'NEW' || !i.status);
        setNotifications(newOnes.slice(0, 10));
        setUnreadCount(newOnes.length);
        initialLoadRef.current = false;
      } else {
        // Detect genuinely new items
        const incoming = list.filter((item) => !knownIdsRef.current.has(item.id));
        if (incoming.length > 0) {
          incoming.forEach((item) => knownIdsRef.current.add(item.id));
          setNotifications((prev) => [...incoming, ...prev]);
          setUnreadCount((c) => c + incoming.length);

          const newest = incoming[0];
          playNotificationChime();
          setLiveToast({
            id: newest.id,
            name: newest.name,
            type: newest.serviceInterest || newest.inquiryType || 'New Requirement',
            details: newest.selectedPropertyTypes || newest.budget || newest.demandAskingPrice || '',
          });

          setTimeout(() => {
            setLiveToast(null);
          }, 8000);
        }
      }
    } catch (err) {
      console.error('Error fetching admin inquiries:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load and background polling every 7 seconds
  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData(true);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Update Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryService.updateStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
      loadData(true);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Save Admin Notes
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      await inquiryService.updateStatus(selectedInquiry.id, selectedInquiry.status, editingNotes);
      setInquiries((prev) =>
        prev.map((item) => (item.id === selectedInquiry.id ? { ...item, adminNotes: editingNotes } : item))
      );
      setSelectedInquiry((prev) => ({ ...prev, adminNotes: editingNotes }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    }
  };

  // Delete Inquiry
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await inquiryService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      loadData(true);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (!inquiries.length) {
      alert('No enquiries to export.');
      return;
    }
    const headers = [
      'ID',
      'Date & Time',
      'Client Name',
      'Phone Number',
      'Email',
      'Enquiry Type',
      'Selected Property Types',
      'Timeline / Urgency',
      'Budget / Demand Asking Price',
      'Status',
      'Admin Notes',
      'Message'
    ];

    const rows = inquiries.map((item) => [
      item.id,
      item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN') : '',
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.phone || ''}"`,
      `"${item.email || ''}"`,
      `"${item.inquiryType || item.serviceInterest || ''}"`,
      `"${(item.selectedPropertyTypes || '').replace(/"/g, '""')}"`,
      `"${(item.timelineUrgency || '').replace(/"/g, '""')}"`,
      `"${(item.budget || item.demandAskingPrice || '').replace(/"/g, '""')}"`,
      `"${item.status || 'NEW'}"`,
      `"${(item.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RR_Builder_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered List
  const filteredInquiries = inquiries.filter((item) => {
    // Search filter
    const searchMatch =
      !searchTerm ||
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.includes(searchTerm)) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.selectedPropertyTypes && item.selectedPropertyTypes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.budget && item.budget.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.demandAskingPrice && item.demandAskingPrice.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    let categoryMatch = true;
    if (activeCategory === 'BUY') {
      categoryMatch =
        item.inquiryType === 'PROPERTY_ENQUIRY' ||
        (item.serviceInterest && item.serviceInterest.toLowerCase().includes('buy')) ||
        Boolean(item.budget);
    } else if (activeCategory === 'SELL') {
      categoryMatch =
        item.inquiryType === 'SELL_PROPERTY' ||
        (item.serviceInterest && item.serviceInterest.toLowerCase().includes('sell')) ||
        Boolean(item.demandAskingPrice);
    } else if (activeCategory === 'BUILD') {
      categoryMatch =
        item.inquiryType === 'BUILD_ON_PLOT' ||
        (item.serviceInterest && item.serviceInterest.toLowerCase().includes('build')) ||
        Boolean(item.selectedPackage);
    } else if (activeCategory === 'CONSULTATION') {
      categoryMatch = item.inquiryType === 'CONSULTATION';
    }

    // Status filter
    const currentStatus = item.status || 'NEW';
    const statusMatch = statusFilter === 'ALL' || currentStatus.toUpperCase() === statusFilter.toUpperCase();

    return searchMatch && categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Top Floating Live Toast Notification */}
      {liveToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm animate-bounce rounded-md border-2 border-accent bg-primary text-hero-foreground p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary font-bold">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold tracking-wider uppercase text-accent">
                New Enquiry Alert!
              </p>
              <h4 className="font-bold text-sm text-hero-foreground">{liveToast.name}</h4>
              <p className="text-xs text-hero-muted mt-0.5">{liveToast.type}</p>
              {liveToast.details && (
                <p className="text-[11px] text-accent/90 mt-1 font-medium bg-black/30 px-2 py-0.5 rounded inline-block">
                  {liveToast.details}
                </p>
              )}
            </div>
            <button
              onClick={() => setLiveToast(null)}
              className="text-hero-muted hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Admin Header Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-md border border-accent/30 bg-[#091522] p-0.5 shadow-sm">
              <img
                src={rrLogo}
                alt="RR Builder & Developer"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold text-primary sm:text-xl">
                  Admin Enquiries Desk
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                RR Builder & Developer, Indore • Real-Time Client CRM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell with Badge & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadCount(0);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-background text-primary hover:bg-muted transition"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground animate-pulse shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-md border border-border bg-card shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-hero-foreground">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Enquiry Notifications
                      </span>
                    </div>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-[11px] text-accent hover:underline font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-border">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground">
                        No pending notifications. All caught up!
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setSelectedInquiry(n);
                            setEditingNotes(n.adminNotes || '');
                            setShowNotifications(false);
                          }}
                          className="p-3.5 hover:bg-muted/60 cursor-pointer transition flex items-start gap-2.5"
                        >
                          <span className="h-2 w-2 rounded-full bg-accent-strong mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-primary">{n.name}</h5>
                              <span className="text-[10px] text-muted-foreground">
                                {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                              </span>
                            </div>
                            <p className="text-[11px] text-accent-strong font-medium">
                              {n.serviceInterest || n.inquiryType}
                            </p>
                            <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                              {n.selectedPropertyTypes || n.budget || n.demandAskingPrice || n.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadData(false)}
              disabled={refreshing}
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline ml-1">Refresh</span>
            </Button>

            {/* Export CSV */}
            <Button
              variant="gold"
              size="sm"
              onClick={handleExportCSV}
              title="Download Excel / CSV format"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Export CSV</span>
            </Button>

            {/* Current User Badge */}
            <div className="hidden md:flex items-center gap-2 rounded-sm border border-border bg-background px-2.5 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-primary">{currentUser.username}</span>
              <span className="text-[10px] text-muted-foreground uppercase">({currentUser.role ? currentUser.role.replace("ROLE_", "") : "ADMIN"})</span>
            </div>

            {/* Change Password Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
              title="Change Password"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1">Security</span>
            </Button>

            {/* Exit / Logout */}
            <Button
              variant="heroOutline"
              size="sm"
              onClick={handleLogout}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
              title="Secure Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline ml-1">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          <div className="rounded-sm border border-border bg-card p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Total Enquiries
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-primary">
              {stats.total || inquiries.length}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Across all website channels</p>
          </div>

          <div className="rounded-sm border border-amber-300/60 bg-amber-500/5 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                Action Required
              </p>
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold text-amber-900">
              {stats.newCount || inquiries.filter((i) => !i.status || i.status === 'NEW').length}
            </h3>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">New unaddressed leads</p>
          </div>

          <div className="rounded-sm border border-border bg-card p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Buy Requirements
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-primary">
              {stats.buyCount || 0}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Plots, Flats, Bungalows</p>
          </div>

          <div className="rounded-sm border border-border bg-card p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Sell Listings
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-primary">
              {stats.sellCount || 0}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Property owners with demand</p>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-sm border border-border bg-card p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Construction / Plot
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-primary">
              {stats.buildCount || 0}
            </h3>
            <p className="mt-1 text-[11px] text-muted-foreground">Civil packages estimates</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 rounded-sm border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by client name, mobile, email, property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-sm border border-input bg-background pl-9 pr-3 text-xs text-foreground outline-none focus:border-accent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-sm border border-input bg-background px-3 text-xs font-semibold text-foreground outline-none focus:border-accent"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW (Pending)</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="CONVERTED">CONVERTED (Closed Win)</option>
                <option value="CLOSED">CLOSED / ARCHIVED</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 border-t border-border/80 pt-3">
            {[
              { id: 'ALL', label: 'All Enquiries' },
              { id: 'BUY', label: 'Buy Requirements' },
              { id: 'SELL', label: 'Sell Property Listings' },
              { id: 'BUILD', label: 'Construction Estimates' },
              { id: 'CONSULTATION', label: 'Consultations' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-sm px-3 py-1.5 text-xs font-bold transition ${
                  activeCategory === tab.id
                    ? 'bg-primary text-hero-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="mt-6 overflow-hidden rounded-sm border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Date / Time</th>
                  <th className="py-3 px-4">Client Details</th>
                  <th className="py-3 px-4">Category & Preference</th>
                  <th className="py-3 px-4">Budget / Asking Demand</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-muted-foreground">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-accent-strong mb-2" />
                      Loading client enquiries from database...
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-muted-foreground">
                      No enquiries found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((item) => {
                    const status = item.status || 'NEW';
                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setSelectedInquiry(item);
                          setEditingNotes(item.adminNotes || '');
                        }}
                        className="hover:bg-muted/40 cursor-pointer transition group"
                      >
                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-muted-foreground font-mono text-[11px]">
                          {item.createdAt ? (
                            <>
                              <div className="font-semibold text-foreground">
                                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </div>
                              <div>
                                {new Date(item.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </>
                          ) : (
                            'N/A'
                          )}
                        </td>

                        {/* Client Info */}
                        <td className="py-3.5 px-4">
                          <strong className="font-bold text-primary block text-sm">
                            {item.name}
                          </strong>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                            <a
                              href={`tel:${item.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent-strong"
                            >
                              <Phone className="h-3 w-3" />
                              {item.phone}
                            </a>
                            {item.email && (
                              <span className="text-muted-foreground">
                                • {item.email}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Category & Preference */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                              item.inquiryType === 'SELL_PROPERTY'
                                ? 'bg-amber-500/15 text-amber-800'
                                : item.inquiryType === 'PROPERTY_ENQUIRY'
                                ? 'bg-blue-500/15 text-blue-800'
                                : item.inquiryType === 'BUILD_ON_PLOT'
                                ? 'bg-purple-500/15 text-purple-800'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {item.serviceInterest || item.inquiryType}
                          </span>
                          <div className="text-xs text-foreground font-semibold line-clamp-1">
                            {item.selectedPropertyTypes || item.propertyType || item.selectedPackage || item.referenceTitle || 'General Enquiry'}
                          </div>
                          {item.plotLocation && (
                            <span className="text-[11px] text-muted-foreground">
                              Location: {item.plotLocation}
                            </span>
                          )}
                        </td>

                        {/* Budget / Demand */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {item.budget ? (
                            <div>
                              <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                                Budget
                              </span>
                              <strong className="text-emerald-700 font-bold">
                                {item.budget}
                              </strong>
                            </div>
                          ) : item.demandAskingPrice ? (
                            <div>
                              <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                                Demand Price
                              </span>
                              <strong className="text-amber-800 font-bold">
                                {item.demandAskingPrice}
                              </strong>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Urgency */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {item.timelineUrgency ? (
                            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground">
                              <Clock className="h-3 w-3 text-accent-strong" />
                              {item.timelineUrgency}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`rounded-sm border px-2.5 py-1 text-[11px] font-bold cursor-pointer outline-none ${
                              status === 'NEW'
                                ? 'border-amber-400 bg-amber-50 text-amber-800'
                                : status === 'CONTACTED'
                                ? 'border-blue-400 bg-blue-50 text-blue-800'
                                : status === 'CONVERTED'
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                                : 'border-border bg-background text-muted-foreground'
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="CONVERTED">CONVERTED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp link */}
                            <a
                              href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                item.name
                              )},%20Greetings%20from%20RR%20Builder%20%26%20Developer,%20Indore.%20Regarding%20your%20${encodeURIComponent(
                                item.serviceInterest || 'property'
                              )}%20enquiry...`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="rounded p-1.5 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </a>

                            {/* View Detail Modal */}
                            <button
                              onClick={() => {
                                setSelectedInquiry(item);
                                setEditingNotes(item.adminNotes || '');
                              }}
                              title="View Full Lead Details"
                              className="rounded p-1.5 text-primary hover:bg-primary/10 transition"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={(e) => handleDelete(item.id, e)}
                              title="Delete Enquiry"
                              className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Full Lead Dossier Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md border border-border bg-card p-6 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-strong">
                  Lead Dossier #{selectedInquiry.id}
                </span>
                <h3 className="font-display text-2xl font-bold text-primary">
                  {selectedInquiry.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Received on {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString('en-IN') : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Action Bar in Modal */}
            <div className="flex flex-wrap gap-2.5 bg-muted/40 p-3 rounded-sm border border-border">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-xs font-bold text-hero-foreground hover:bg-primary/90"
              >
                <Phone className="h-3.5 w-3.5 text-accent" /> Call {selectedInquiry.phone}
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                  selectedInquiry.name
                )},%20Greetings%20from%20RR%20Builder%20%26%20Developer,%20Indore.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Client
              </a>
              {selectedInquiry.email && (
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted"
                >
                  <Mail className="h-3.5 w-3.5" /> Send Email
                </a>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded border border-border p-3 space-y-2 bg-background/50">
                <p className="font-bold text-primary uppercase tracking-wider text-[11px]">
                  Client Requirements
                </p>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Type / Interest:</span>
                  <span className="font-semibold text-foreground">
                    {selectedInquiry.serviceInterest || selectedInquiry.inquiryType}
                  </span>
                </div>
                {selectedInquiry.selectedPropertyTypes && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Selected Property Types:</span>
                    <span className="font-bold text-primary">
                      {selectedInquiry.selectedPropertyTypes}
                    </span>
                  </div>
                )}
                {selectedInquiry.timelineUrgency && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Timeline / Urgency:</span>
                    <span className="font-semibold text-accent-strong">
                      {selectedInquiry.timelineUrgency}
                    </span>
                  </div>
                )}
                {selectedInquiry.budget && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Client Budget:</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      {selectedInquiry.budget}
                    </span>
                  </div>
                )}
                {selectedInquiry.demandAskingPrice && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Owner Demand (Asking Price):</span>
                    <span className="font-bold text-amber-800 text-sm">
                      {selectedInquiry.demandAskingPrice}
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded border border-border p-3 space-y-2 bg-background/50">
                <p className="font-bold text-primary uppercase tracking-wider text-[11px]">
                  Property / Project Details
                </p>
                {selectedInquiry.plotLocation && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Plot Location:</span>
                    <span className="font-semibold">{selectedInquiry.plotLocation}</span>
                  </div>
                )}
                {selectedInquiry.plotSize && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Plot Dimensions:</span>
                    <span className="font-semibold">{selectedInquiry.plotSize}</span>
                  </div>
                )}
                {selectedInquiry.selectedPackage && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Construction Package:</span>
                    <span className="font-bold text-primary">{selectedInquiry.selectedPackage}</span>
                  </div>
                )}
                {selectedInquiry.referenceTitle && (
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Referenced Project / Property:</span>
                    <span className="font-semibold text-primary">{selectedInquiry.referenceTitle}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground block text-[11px]">Current Status:</span>
                  <select
                    value={selectedInquiry.status || 'NEW'}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="mt-1 rounded border border-input bg-card px-2.5 py-1 text-xs font-bold text-primary"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Client Message */}
            {selectedInquiry.message && (
              <div className="rounded border border-border p-3 bg-muted/20">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Client Message / Requirement Notes:
                </p>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
            )}

            {/* Admin Internal Notes Notepad */}
            <div className="rounded border border-border p-4 bg-card space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Admin Internal Follow-up Notes
                </p>
                {saveSuccess && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Check className="h-3.5 w-3.5" /> Notes Saved!
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                placeholder="Write internal remarks (e.g. Called client on 3rd Oct, interested in 3BHK flat near Vijay Nagar under 60L. Follow-up scheduled for Monday 11 AM)..."
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full rounded-sm border border-input bg-background p-3 text-xs text-foreground outline-none focus:border-accent"
              />
              <div className="flex justify-end">
                <Button variant="gold" size="sm" onClick={handleSaveNotes}>
                  <Save className="h-3.5 w-3.5 mr-1" />
                  Save Admin Notes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-md border border-border bg-card p-6 shadow-2xl">
            <button
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordError("");
                setPasswordSuccess("");
              }}
              className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <KeyRound className="h-5 w-5 text-accent-strong" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary">Change Admin Password</h3>
                <p className="text-xs text-muted-foreground">Update your RR Builders CRM master credentials</p>
              </div>
            </div>

            {passwordSuccess && (
              <div className="mb-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="mb-4 rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-xs font-semibold text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-10 w-full rounded-sm border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  New Password
                </label>
                <input
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="h-10 w-full rounded-sm border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Confirm New Password
                </label>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="h-10 w-full rounded-sm border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-accent"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gold"
                  size="sm"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
