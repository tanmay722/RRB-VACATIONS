import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Save,
  Upload,
  X,
  PlusCircle,
  Package as PackageIcon,
  Info,
  List,
  Map,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const PackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAuth();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    location: "",
    image: "",
    duration: "",
    category: "",
    type: "domestic",
    slug: "",
    overview: "",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    images: [],
    rating: 5,
    reviews: 0,
    additionalInfo: {
      bestTimeToVisit: "",
      languages: "",
      currency: "",
      visa: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [admin, navigate]);

  useEffect(() => {
    if (isEdit) {
      fetchPackage();
    }
  }, [id, isEdit]);

  const fetchPackage = async () => {
    try {
      setFetching(true);
      const res = await api.get(`/packages/${id}`);
      const data = res.data;
      
      // Parse JSON fields if they come as strings (common issue with some DB setups)
      const parseField = (field) => {
        if (typeof field === 'string') {
          try {
            return JSON.parse(field);
          } catch (e) {
            console.error("Failed to parse field:", field, e);
            return [];
          }
        }
        return field || [];
      };

      const parseObjectField = (field, defaultVal) => {
        if (typeof field === 'string') {
          try {
            return JSON.parse(field);
          } catch (e) {
            return defaultVal;
          }
        }
        return field || defaultVal;
      };

      setFormData({
        ...data,
        highlights: parseField(data.highlights),
        itinerary: parseField(data.itinerary),
        inclusions: parseField(data.inclusions),
        exclusions: parseField(data.exclusions),
        images: parseField(data.images),
        additionalInfo: parseObjectField(data.additionalInfo, {
          bestTimeToVisit: "",
          languages: "",
          currency: "",
          visa: "",
        }),
      });
    } catch (err) {
      toast.error("Failed to fetch package details");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addItem = (field, template = "") => {
    setFormData({ ...formData, [field]: [...formData[field], template] });
  };

  const removeItem = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setLoading(true);
      const res = await api.post("/packages/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, image: res.data.url });
      toast.success("Main image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadData = new FormData();
    files.forEach((file) => {
      uploadData.append("images", file);
    });

    try {
      setLoading(true);
      const res = await api.post("/packages/upload/gallery", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({
        ...formData,
        images: [
          ...(Array.isArray(formData.images) ? formData.images : []),
          ...(Array.isArray(res.data.urls) ? res.data.urls : []),
        ],
      });
      toast.success("Gallery images uploaded");
    } catch (err) {
      toast.error("Gallery upload failed");
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== indexToRemove),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/packages/${id}`, formData);
        toast.success("Package updated successfully");
      } else {
        await api.post("/packages", formData);
        toast.success("Package added successfully");
      }
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error saving package");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Loading package data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-orange-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
          >
            <div className="p-2 rounded-full group-hover:bg-gray-900 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span className="font-medium tracking-wide uppercase text-xs">Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
             <div className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold border border-orange-500/20">
                ADMIN PANEL
             </div>
          </div>
        </motion.div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Header Card */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
                    <PackageIcon size={24} className="text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                    {isEdit ? "Edit" : "Create"} <span className="text-orange-500">Package</span>
                  </h1>
                </div>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  {isEdit ? `Modifying: ${formData.title}` : "Create a new adventure for your travelers"}
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto overflow-hidden group relative flex justify-center items-center gap-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-orange-500/20"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={20} className="group-hover:scale-110 transition-transform" />
                    <span>{isEdit ? "Update" : "Publish"} Package</span>
                  </>
                )}
              </button>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Details Section */}
              <SectionContainer icon={<Info size={20} />} title="Basic Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Kashi Spiritual Journey"
                    required
                  />
                  <Input 
                    label="Slug (URL)" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleChange} 
                    placeholder="kashi-spiritual-journey"
                    required
                  />
                  <div className="md:col-span-2">
                    <Input 
                      label="Subtitle" 
                      name="subtitle" 
                      value={formData.subtitle} 
                      onChange={handleChange} 
                      placeholder="A short tagline to attract travelers"
                    />
                  </div>
                  <Input 
                    label="Location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="Varanasi, India"
                    required
                  />
                  <Input 
                    label="Duration" 
                    name="duration" 
                    value={formData.duration} 
                    onChange={handleChange} 
                    placeholder="3 Days / 2 Nights"
                    required
                  />
                </div>
              </SectionContainer>

              {/* Categorization & Stats */}
              <SectionContainer icon={<List size={20} />} title="Categorization & Ratings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select 
                    label="Package Type" 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    options={[
                      { value: "domestic", label: "Domestic" },
                      { value: "international", label: "International" }
                    ]}
                  />
                  <Input 
                    label="Category" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    placeholder="RELIGIOUS, ADVENTURE, etc."
                    required
                  />
                  <Input 
                    label="Rating (1-5)" 
                    name="rating" 
                    type="number"
                    min="1" max="5"
                    value={formData.rating} 
                    onChange={handleChange} 
                  />
                  <Input 
                    label="Review Count" 
                    name="reviews" 
                    type="number"
                    value={formData.reviews} 
                    onChange={handleChange} 
                  />
                </div>
              </SectionContainer>

              {/* Overview Section */}
              <SectionContainer icon={<FileText size={20} />} title="Detailed Description">
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-950/50 border border-white/10 rounded-2xl p-4 h-48 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-gray-300 leading-relaxed"
                  placeholder="Tell the story of this package..."
                ></textarea>
              </SectionContainer>

              {/* Itinerary Section */}
              <SectionContainer 
                icon={<Map size={20} />} 
                title="Itinerary" 
                action={
                  <button
                    type="button"
                    onClick={() => addItem("itinerary", { day: `Day ${formData.itinerary.length + 1}`, description: "" })}
                    className="text-orange-500 hover:text-orange-400 font-bold text-sm flex items-center gap-1 transition-colors"
                  >
                    <PlusCircle size={16} /> Add Day
                  </button>
                }
              >
                <div className="space-y-4">
                  <AnimatePresence>
                    {formData.itinerary.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="group relative bg-gray-950/40 border border-white/5 p-4 rounded-2xl hover:border-orange-500/20 transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => removeItem("itinerary", index)}
                          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={18} />
                        </button>
                        <input
                          type="text"
                          value={item.day}
                          onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                          className="bg-transparent text-lg font-bold text-orange-400 border-none focus:ring-0 w-full mb-2 placeholder:text-gray-700"
                          placeholder="Day #: Title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm text-gray-400 h-24 resize-none"
                          placeholder="Describe the day's activities..."
                        ></textarea>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {formData.itinerary.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl text-gray-600">
                      No itinerary days added yet.
                    </div>
                  )}
                </div>
              </SectionContainer>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Media Section */}
              <SectionContainer icon={<ImageIcon size={20} />} title="Media & Visuals">
                <div className="space-y-6">
                  {/* Hero Image */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Hero Image</label>
                    <div className="relative group rounded-3xl overflow-hidden aspect-video bg-gray-950 border border-white/10 flex items-center justify-center">
                      {formData.image ? (
                        <img
                          src={formData.image.startsWith("/uploads") ? `http://localhost:5000${formData.image}` : formData.image}
                          alt="Hero"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-700">
                          <ImageIcon size={40} strokeWidth={1} />
                          <span className="text-xs mt-2">No image selected</span>
                        </div>
                      )}
                      <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm">
                        <Upload className="text-white mb-2" />
                        <span className="text-white text-xs font-bold">Replace Image</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <div className="mt-3">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Or paste external URL..."
                        className="w-full bg-gray-950/50 border border-white/10 rounded-xl p-3 text-xs text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Gallery (Max 3)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <AnimatePresence>
                        {formData.images.map((imgUrl, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10"
                          >
                            <img
                              src={imgUrl.startsWith("/uploads") ? `http://localhost:5000${imgUrl}` : imgUrl}
                              alt="Gallery"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity backdrop-blur-[2px]"
                            >
                              <X size={20} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {formData.images.length < 3 && (
                        <label className="cursor-pointer border-2 border-dashed border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center hover:border-orange-500/30 hover:bg-white/5 transition-all text-gray-500 group">
                          <PlusCircle size={24} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] uppercase font-bold mt-2">Add Photo</span>
                          <input type="file" multiple className="hidden" onChange={handleGalleryUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </SectionContainer>

              {/* Highlights Section */}
              <ArraySection 
                title="Highlights" 
                items={formData.highlights} 
                onAdd={() => addItem("highlights")} 
                onRemove={(i) => removeItem("highlights", i)} 
                onChange={(i, v) => handleArrayChange("highlights", i, v)}
                placeholder="What makes this tour special?"
              />

              {/* Inclusions */}
              <ArraySection 
                title="Inclusions" 
                items={formData.inclusions} 
                onAdd={() => addItem("inclusions")} 
                onRemove={(i) => removeItem("inclusions", i)} 
                onChange={(i, v) => handleArrayChange("inclusions", i, v)}
                placeholder="What's included in the price?"
                isTag
              />

              {/* Exclusions */}
              <ArraySection 
                title="Exclusions" 
                items={formData.exclusions} 
                onAdd={() => addItem("exclusions")} 
                onRemove={(i) => removeItem("exclusions", i)} 
                onChange={(i, v) => handleArrayChange("exclusions", i, v)}
                placeholder="What's NOT included?"
                color="red"
              />

              {/* Additional Logistical Info */}
              <SectionContainer icon={<AlertCircle size={20} />} title="Logistics & Info">
                <div className="space-y-4">
                  <Input 
                    label="Best Time" 
                    name="additionalInfo.bestTimeToVisit" 
                    value={formData.additionalInfo.bestTimeToVisit} 
                    onChange={handleChange} 
                    compact
                  />
                  <Input 
                    label="Languages" 
                    name="additionalInfo.languages" 
                    value={formData.additionalInfo.languages} 
                    onChange={handleChange} 
                    compact
                  />
                  <Input 
                    label="Currency" 
                    name="additionalInfo.currency" 
                    value={formData.additionalInfo.currency} 
                    onChange={handleChange} 
                    compact
                  />
                  <Input 
                    label="Visa" 
                    name="additionalInfo.visa" 
                    value={formData.additionalInfo.visa} 
                    onChange={handleChange} 
                    compact
                  />
                </div>
              </SectionContainer>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sub-components for cleaner structure
const SectionContainer = ({ icon, title, children, action }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8"
  >
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="text-orange-500 p-2 bg-orange-500/10 rounded-xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white/90">{title}</h3>
      </div>
      {action}
    </div>
    {children}
  </motion.div>
);

const Input = ({ label, compact, ...props }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input
      {...props}
      className={`w-full bg-gray-950/50 border border-white/10 rounded-2xl ${compact ? 'p-3 text-sm' : 'p-4'} text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all placeholder:text-gray-700`}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <select
      {...props}
      className="w-full bg-gray-950/50 border border-white/10 rounded-2xl p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/40 appearance-none transition-all"
    >
      {options.map(opt => <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>)}
    </select>
  </div>
);

const ArraySection = ({ title, items, onAdd, onRemove, onChange, placeholder, color = "orange", isTag }) => (
  <SectionContainer 
    icon={color === "red" ? <AlertCircle size={20} /> : <CheckCircle size={20} />} 
    title={title}
    action={
      <button
        type="button"
        onClick={onAdd}
        className={`text-${color}-500 hover:text-${color}-400 font-bold text-sm flex items-center gap-1 transition-colors`}
      >
        <PlusCircle size={16} /> Add
      </button>
    }
  >
    <div className="space-y-2">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex gap-2 group"
          >
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={placeholder}
              className={`flex-1 bg-gray-950/60 border border-white/5 rounded-xl p-3 text-sm text-gray-300 focus:ring-1 focus:ring-${color}-500/50 focus:border-${color}-500/30 transition-all`}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-gray-600 hover:text-red-500 p-2 transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      {items.length === 0 && (
        <p className="text-center py-4 text-xs text-gray-700 uppercase font-bold tracking-widest">Empty</p>
      )}
    </div>
  </SectionContainer>
);

export default PackageForm;
