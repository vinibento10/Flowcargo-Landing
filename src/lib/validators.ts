/**
 * Form Validation Utilities
 * Centralized validation functions for forms across the application
 */

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Accepts multiple formats:
  // (11) 98765-4321, 11 98765-4321, 11987654321, +55 11 98765-4321
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10 && digitsOnly.length <= 13;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10;
};

export interface FormValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  empresa?: string;
}

export const validateContactForm = (data: ContactFormData): FormValidationResult => {
  const errors: string[] = [];

  // Validate name
  if (!data.nome || !validateName(data.nome)) {
    errors.push("Nome deve ter pelo menos 3 caracteres");
  }

  // Validate email
  if (!data.email || !validateEmail(data.email)) {
    errors.push("Email inválido");
  }

  // Validate phone (optional but if provided, must be valid)
  if (data.telefone && !validatePhone(data.telefone)) {
    errors.push("Telefone inválido (use formato: 11 98765-4321)");
  }

  // Validate message
  if (!data.mensagem || !validateMessage(data.mensagem)) {
    errors.push("Mensagem deve ter pelo menos 10 caracteres");
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize form data before sending
 * Removes extra whitespace and normalizes values
 */
export const sanitizeFormData = (data: ContactFormData): ContactFormData => {
  return {
    nome: data.nome.trim(),
    email: data.email.trim().toLowerCase(),
    telefone: data.telefone.trim(),
    mensagem: data.mensagem.trim(),
    empresa: data.empresa?.trim() || ""
  };
};

/**
 * Format phone number for display
 * Converts various formats to (XX) XXXXX-XXXX
 */
export const formatPhoneNumber = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 11) {
    // Brazilian format: (XX) XXXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
  } else if (digitsOnly.length === 10) {
    // Older format: (XX) XXXX-XXXX
    return `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
  }
  
  return phone;
};
