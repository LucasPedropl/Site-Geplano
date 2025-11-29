import React, { useEffect, useState } from 'react';
import { CheckCircle2, HardDrive, KeyRound, Chrome, ShieldAlert, Plus, Trash2, Save, AlertTriangle, FileImage } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../services/firebase';

const SETTINGS_DOC = 'settings';
const SETTINGS_COLLECTION = 'geplano_config';

export const FirebaseSetupGuide: React.FC = () => {
  const [allowedEmails, setAllowedEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Carregar lista de e-mails permitidos
  useEffect(() => {
    const loadSettings = async () => {
      if (!db) return;
      try {
        const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAllowedEmails(docSnap.data().allowed_emails || []);
        } else {
          // Se não existir, cria com o usuário atual para não bloquear
          if (auth?.currentUser?.email) {
             const initialList = [auth.currentUser.email];
             await setDoc(docRef, { allowed_emails: initialList });
             setAllowedEmails(initialList);
          }
        }
      } catch (e) {
        console.error("Erro ao carregar configurações:", e);
      }
    };
    loadSettings();
  }, []);

  const handleAddEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) return;
    if (allowedEmails.includes(newEmail)) return;

    setLoading(true);
    const updatedList = [...allowedEmails, newEmail];
    
    try {
        await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), { allowed_emails: updatedList }, { merge: true });
        setAllowedEmails(updatedList);
        setNewEmail('');
        setMsg('E-mail adicionado com sucesso!');
    } catch (e) {
        setMsg('Erro ao salvar.');
    } finally {
        setLoading(false);
        setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleRemoveEmail = async (emailToRemove: string) => {
    if (confirm(`Remover acesso de ${emailToRemove}?`)) {
        setLoading(true);
        const updatedList = allowedEmails.filter(e => e !== emailToRemove);
        try {
            await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), { allowed_emails: updatedList }, { merge: true });
            setAllowedEmails(updatedList);
            setMsg('E-mail removido.');
        } catch (e) {
            setMsg('Erro ao remover.');
        } finally {
            setLoading(false);
            setTimeout(() => setMsg(''), 3000);
        }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in-up">
        
        {/* --- CABEÇALHO --- */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-green-100 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={32} />
            </div>
            <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Banco de Dados e Configurações</h2>
                <p className="text-gray-600 leading-relaxed">
                    Gerencie quem pode acessar este painel e entenda como as imagens estão sendo salvas.
                </p>
            </div>
        </div>

        {/* --- RESPOSTA 1: UPLOAD DE IMAGENS --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4 text-geplano-green">
                <FileImage size={24} />
                <h3 className="font-bold text-xl">Upload de Imagens (Solução Simples)</h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                <h4 className="font-bold text-blue-900 text-sm mb-2">Sua Pergunta:</h4>
                <p className="text-blue-800 text-sm italic">
                    "Gostaria de manter a funcionalidade de upload de imagem, para facilitar pro cliente, existe outra solução simples para resolver isso?"
                </p>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                    <strong>Sim, existe!</strong> Implementamos agora um sistema de <strong>conversão interna (Base64)</strong>.
                </p>
                <p>
                    Quando o cliente clica em "Carregar Imagem" no formulário, o sistema pega a foto, <strong>comprime automaticamente</strong> para reduzir o tamanho, e salva o código da imagem diretamente dentro do texto do site (Firestore).
                </p>
                <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg space-y-2 mt-2">
                    <li><span className="font-bold text-green-600">Vantagem:</span> O cliente volta a ter o botão "Upload" simples e fácil. Não precisa hospedar em outros sites.</li>
                    <li><span className="font-bold text-orange-500">Atenção:</span> Como não usamos o Storage dedicado, existe um limite de tamanho. O sistema comprime as imagens automaticamente para garantir que caibam no banco de dados gratuito.</li>
                </ul>
            </div>
        </div>

        {/* --- RESPOSTA 2: CONTROLE DE ACESSO --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-geplano-gold/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-geplano-gold"></div>
            <div className="flex items-center gap-3 mb-6 text-gray-900">
                <ShieldAlert size={28} className="text-geplano-gold" />
                <h3 className="font-bold text-xl">Controle de Acesso (Whitelist)</h3>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="font-bold text-blue-900 text-sm mb-2">Sua Pergunta:</h4>
                <p className="text-blue-800 text-sm italic">
                    "Sobre o login com o google... devo configurar quais contas google conseguem realiza-lo? ou qualquer uma consegue?"
                </p>
                <p className="text-blue-900 text-sm mt-2 font-bold">
                    Resposta: Configuramos agora para que APENAS os e-mails listados abaixo tenham acesso.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="email" 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="novo.usuario@gmail.com"
                        className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-geplano-gold outline-none"
                    />
                    <button 
                        onClick={handleAddEmail}
                        disabled={loading}
                        className="bg-geplano-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Adicionar
                    </button>
                </div>

                {msg && <p className="text-sm font-bold text-green-600 animate-pulse">{msg}</p>}

                <div className="mt-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Usuários Permitidos</h4>
                    <div className="bg-gray-50 rounded-lg border border-gray-100 divide-y divide-gray-100">
                        {allowedEmails.length === 0 ? (
                            <div className="p-4 text-center text-gray-400 text-sm">Nenhum e-mail configurado. O acesso está livre ou restrito ao admin atual.</div>
                        ) : (
                            allowedEmails.map((email) => (
                                <div key={email} className="p-4 flex items-center justify-between group hover:bg-white transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-geplano-gold/10 text-geplano-gold flex items-center justify-center">
                                            <KeyRound size={16} />
                                        </div>
                                        <span className="font-medium text-gray-700">{email}</span>
                                        {auth?.currentUser?.email === email && (
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Você</span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveEmail(email)}
                                        disabled={allowedEmails.length <= 1} // Evita deletar o último e se trancar fora
                                        className="text-gray-400 hover:text-red-500 p-2 rounded hover:bg-red-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        title="Remover acesso"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <AlertTriangle size={12} />
                        Importante: Se você remover seu próprio e-mail, será desconectado imediatamente.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};