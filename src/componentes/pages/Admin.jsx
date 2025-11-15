import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingCart, FiCalendar } from 'react-icons/fi';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

/**
 * Componente Admin - Painel administrativo
 * Gerencia financiamentos solicitados, vendas feitas e test drives agendados
 */
const Admin = () => {
  const [activeTab, setActiveTab] = useState('financiamentos');
  const [financiamentos, setFinanciamentos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [testDrives, setTestDrives] = useState([]);

  useEffect(() => {
    // Carregar dados do localStorage
    loadData();
  }, []);

  const loadData = () => {
    // Carregar financiamentos
    const storedFinanciamentos = JSON.parse(localStorage.getItem('financiamentos') || '[]');
    setFinanciamentos(storedFinanciamentos);

    // Carregar vendas
    const storedVendas = JSON.parse(localStorage.getItem('vendas') || '[]');
    setVendas(storedVendas);

    // Carregar test drives
    const storedTestDrives = JSON.parse(localStorage.getItem('testDrives') || '[]');
    setTestDrives(storedTestDrives);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const TabButton = ({ icon: Icon, label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 md:px-6 py-3 font-medium transition-all duration-300 border-b-2 text-sm md:text-base ${
        activeTab === tabName
          ? 'text-primary border-primary'
          : 'text-gray-600 border-transparent hover:text-primary hover:border-primary/50'
      }`}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              Painel Administrativo
            </h1>
            <p className="text-gray-600">
              Gerencie financiamentos, vendas e test drives
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b overflow-x-auto">
              <TabButton
                icon={FiDollarSign}
                label="Financiamentos Solicitados"
                tabName="financiamentos"
              />
              <TabButton
                icon={FiShoppingCart}
                label="Vendas Feitas"
                tabName="vendas"
              />
              <TabButton
                icon={FiCalendar}
                label="Test Drives Agendados"
                tabName="testdrives"
              />
            </div>

            {/* Conteúdo das Tabs */}
            <div className="p-4 md:p-6">
              {/* Aba Financiamentos */}
              {activeTab === 'financiamentos' && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                    Financiamentos Solicitados ({financiamentos.length})
                  </h2>
                  {financiamentos.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiDollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Nenhum financiamento solicitado ainda</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Veículo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Valor
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Entrada
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Parcelas
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contato
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {financiamentos.map((fin, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(fin.date)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{fin.nome}</div>
                                <div className="text-sm text-gray-500">{fin.cpf}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {fin.vehicleName || '-'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(fin.valorVeiculo)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(fin.entrada)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {fin.parcelas}x
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{fin.email}</div>
                                <div className="text-sm text-gray-500">{fin.telefone}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Aba Vendas */}
              {activeTab === 'vendas' && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                    Vendas Feitas ({vendas.length})
                  </h2>
                  {vendas.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma venda registrada ainda</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Veículo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Valor Total
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Forma de Pagamento
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {vendas.map((venda, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(venda.date)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{venda.cliente}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {venda.veiculo}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(venda.valor)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {venda.formaPagamento}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  venda.status === 'Concluída'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {venda.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Aba Test Drives */}
              {activeTab === 'testdrives' && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-6">
                    Test Drives Agendados ({testDrives.length})
                  </h2>
                  {testDrives.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiCalendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Nenhum test drive agendado ainda</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data Agendada
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Horário
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Veículo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CNH
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contato
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {testDrives.map((td, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatDate(td.dataTestDrive)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {td.horario || '-'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{td.nome}</div>
                                <div className="text-sm text-gray-500">{td.cpf}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {td.vehicleName || '-'}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                {td.cnh}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{td.email}</div>
                                <div className="text-sm text-gray-500">{td.telefone}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
